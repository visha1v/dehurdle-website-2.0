import { useState } from 'react';

import { CustomButton } from 'components';
import { ApiStatusPreset, LocalStorageKeys } from 'constant';
import { translate } from 'locales';
import { observer } from 'mobx-react-lite';
import { WreckerOptionsType, useStore } from 'models';
import { getLocalStorageValue, setLocalStorageValue } from 'utils';

import { Typography } from '@mui/material';

import './assessmentQuestions-styles.scss';

interface IAssessmentQuestionsProps {
  onButtonClick: () => void;
}

const AssessmentQuestions = (props: IAssessmentQuestionsProps) => {
  const { onButtonClick } = props;

  const { domainStore, viewStore } = useStore();
  const { wreckerStore } = domainStore;
  const { apiStatusStore } = viewStore;
  const { submitWreckerAssessment } = wreckerStore;
  const { getApiStatus } = apiStatusStore;
  const { isLoading } = getApiStatus(ApiStatusPreset.SubmitWreckerAssessment) || {};

  const [selectedOption, setSelectedOption] = useState<WreckerOptionsType | null>(null);
  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(
    Number(getLocalStorageValue(LocalStorageKeys.CurrentQuestionNumber)) || 1,
  );

  const { questions = [], totalQuestions = 0 } =
    getLocalStorageValue(LocalStorageKeys.WreckerQuestionsData) || {};
  const { text, options } = questions[currentQuestionNumber - 1] || {};
  const isLastQuestion = currentQuestionNumber === questions?.length;
  const answersLength = getLocalStorageValue(LocalStorageKeys.WreckerAnswer)?.length || 0;

  const onNextClick = () => {
    if (!!selectedOption && !isLoading) {
      const assessmentAnswers = getLocalStorageValue(LocalStorageKeys.WreckerAnswer) || [];
      if (answersLength < totalQuestions) {
        const answer = {
          questionId: questions[currentQuestionNumber - 1].id,
          weightagePercentage: questions[currentQuestionNumber - 1].weightagePercentage,
          wreckerId: questions[currentQuestionNumber - 1].wreckerId,
          optionScore: selectedOption?.score,
        };
        assessmentAnswers.push(answer);
        setLocalStorageValue(LocalStorageKeys.WreckerAnswer, assessmentAnswers);
      }
      if (currentQuestionNumber < questions?.length) {
        setCurrentQuestionNumber(currentQuestionNumber + 1);
        setLocalStorageValue(LocalStorageKeys.CurrentQuestionNumber, currentQuestionNumber + 1);
        setSelectedOption(null);
      } else {
        submitWreckerAssessment(assessmentAnswers, onButtonClick);
      }
    }
  };

  const handleOptionClick = (option: WreckerOptionsType) => () => {
    setSelectedOption(option);
  };

  const renderOptions = () =>
    options?.map((option: WreckerOptionsType) => {
      const { key, value } = option;
      const isSelected = selectedOption?.key === key;
      return (
        <Typography
          className={`assessment-questions__${isSelected ? 'selected-option' : 'option'}`}
          key={key}
          onClick={handleOptionClick(option)}>
          {value}
        </Typography>
      );
    });

  return (
    <div className="assessment-questions__container">
      <div className="assessment-questions__question-container">
        <div className="assessment-questions__header-container">
          <Typography className="assessment-questions__header-title">
            {translate('screens.wrecker-assessment.questions.select-answer')}
          </Typography>
          <Typography className="assessment-questions__header-subtitle">{`${currentQuestionNumber}/${totalQuestions}`}</Typography>
        </div>
        <Typography className="assessment-questions__question">{text}</Typography>
        <div className="assessment-questions__options-container">{renderOptions()}</div>
        <CustomButton
          buttonContainerClassName="assessment-questions__button"
          buttonTextClassName="assessment-questions__button-title"
          disabled={!selectedOption}
          isLoading={isLoading}
          label={isLastQuestion ? translate('common.submit') : translate('common.next')}
          onClick={onNextClick}
        />
      </div>
    </div>
  );
};

export default observer(AssessmentQuestions);
