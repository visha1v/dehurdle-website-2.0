import { ApiStatusCode, ApiStatusPreset, LocalStorageKeys, ToastPreset } from 'constant';
import { Instance, flow, getRoot, types } from 'mobx-state-tree';
import { Api, WreckerAnswerType } from 'services';
import { getToastMessage, setLocalStorageValue } from 'utils';

import { RootStoreType } from '../../root-store/root-store';

const WreckerOptions = types.model('WreckerOptions', {
  key: types.string,
  score: types.number,
  value: types.string,
});

const WreckerQuestions = types.model('WreckerQuestions', {
  id: types.number,
  options: types.array(WreckerOptions),
  text: types.string,
  weightagePercentage: types.number,
  wreckerId: types.number,
});

const WreckerItem = types.model('WreckerItem', {
  description: types.string,
  id: types.number,
  name: types.string,
  score: types.number,
});

export type WreckerOptionsType = Instance<typeof WreckerOptions>;
export type WreckerQuestionsType = Instance<typeof WreckerQuestions>;
export type WreckerItemType = Instance<typeof WreckerItem>;

const WreckerStore = types
  .model('WreckerStore', {
    dateOfAssessment: types.maybeNull(types.string),
    questions: types.array(WreckerQuestions),
    retakeAssessmentFlag: false,
    totalQuestions: types.number,
    totalScore: types.maybeNull(types.number),
    wreckers: types.array(WreckerItem),
  })
  .actions(self => ({
    getWreckerQuestions: flow(function* getWreckerQuestions() {
      const { viewStore } = getRoot<RootStoreType>(self);
      const { apiStatusStore } = viewStore;
      const { setApiStatus } = apiStatusStore;
      try {
        setApiStatus({ id: ApiStatusPreset.GetWreckerQuestions, isLoading: true });
        const result = yield Api.getQuestions();
        console.log('getWreckerQuestions API successful');
        if (result.status === ApiStatusCode.Success) {
          setApiStatus({ id: ApiStatusPreset.GetWreckerQuestions, hasFetched: true });
          const questions = result.data.data.map(
            (questionItem: {
              id: string;
              options_json: string;
              question: string;
              weightage_percentage: number;
              wrecker_id: number;
            }) => {
              return {
                options: questionItem.options_json.map((option: WreckerOptionsType) => ({
                  key: option.key,
                  score: option.score,
                  value: option.value,
                })),
                id: questionItem.id,
                text: questionItem.question,
                weightagePercentage: questionItem.weightage_percentage,
                wreckerId: questionItem.wrecker_id,
              };
            },
          );
          self.questions = questions;
          self.totalQuestions = result.data.total_count;
          setLocalStorageValue(LocalStorageKeys.WreckerQuestionsData, {
            questions,
            totalQuestions: result.data.total_count,
          });
        }
      } catch (error) {
        console.log('getWreckerQuestions API failed', error);
      } finally {
        setApiStatus({ id: ApiStatusPreset.GetWreckerQuestions, isLoading: false });
      }
    }),

    submitWreckerAssessment: flow(function* submitWreckerAssessment(
      payload: WreckerAnswerType[],
      successCallback: () => void,
    ) {
      const { viewStore } = getRoot<RootStoreType>(self);
      const { apiStatusStore, toastStore } = viewStore;
      const { popToast } = toastStore;
      const { setApiStatus } = apiStatusStore;
      try {
        setApiStatus({ id: ApiStatusPreset.SubmitWreckerAssessment, isLoading: true });
        const apiPayload = payload.map(item => ({
          option_score: item.optionScore,
          question_id: item.questionId,
          weightage_percentage: item.weightagePercentage,
          wrecker_id: item.wreckerId,
        }));
        const result = yield Api.submitAssessment(apiPayload);
        if (result.status === ApiStatusCode.Success) {
          setApiStatus({ id: ApiStatusPreset.SubmitWreckerAssessment, hasFetched: true });
          self.totalScore = result.data.total_score;
          self.wreckers = result.data.wreckers;
          self.retakeAssessmentFlag = result.data.retake_assessment_flag;
          self.dateOfAssessment = result.data.date_of_assessment;
          successCallback();
        } else {
          popToast({
            type: ToastPreset.Error,
            subTitle: getToastMessage(result?.data?.code),
          });
        }
      } catch (error) {
        console.log('submitWreckerAssessment API failed', error);
      } finally {
        setApiStatus({ id: ApiStatusPreset.SubmitWreckerAssessment, isLoading: false });
      }
    }),
  }));

export { WreckerStore };
