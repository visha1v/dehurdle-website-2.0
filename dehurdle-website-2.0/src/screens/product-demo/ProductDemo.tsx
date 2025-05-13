import { useEffect, useState } from 'react';

import { CustomAppWrapper } from 'components';
import { ApiStatusPreset, INITIAL_FORM_ERROR, INITIAL_FORM_VALUE } from 'constant';
import { ActiveMediaContextProvider } from 'context';
import { observer } from 'mobx-react-lite';
import { useStore } from 'models';
import { ISubmitLeadsPayload } from 'services';
import { ActiveMediaPreset } from 'types';

import { Challenges, DemoVideo, DetailsForm, DetailsModal, FAQ, Gamification } from './components';
import './productDemo-styles.scss';

const ProductDemo = () => {
  const { applicationStore, domainStore, viewStore } = useStore();
  const { faqStore } = applicationStore;
  const { getFaqs, faqAllData } = faqStore;
  const { submitLeads } = domainStore;
  const { apiStatusStore } = viewStore;
  const { getApiStatus } = apiStatusStore;
  const { isLoading = false } = getApiStatus(ApiStatusPreset.GetFaqs) || {};

  const [isFormVisible, setIsFormVisible] = useState(true);
  const [activeMedia, setActiveMedia] = useState('');
  const [formValue, setFormValue] = useState(INITIAL_FORM_VALUE);
  const [formError, setFormError] = useState(INITIAL_FORM_ERROR);
  const [selectedOption, setSelectedOption] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const onModalClose = (value: ISubmitLeadsPayload) => {
    const formValue = { email: value.email, companyName: value.company_name };
    setFormValue(formValue);
    setIsFormVisible(false);
    setIsVideoPlaying(true);
  };

  const onSubmitFormClick = async (payload: ISubmitLeadsPayload) => {
    await submitLeads(payload, () => {
      setFormValue(INITIAL_FORM_VALUE);
      setIsFormVisible(true);
      setSelectedOption('');
    });
  };

  useEffect(() => {
    if (activeMedia === ActiveMediaPreset.DemoVideo) {
      setIsVideoPlaying(true);
    }
  }, [activeMedia]);

  useEffect(() => {
    getFaqs();
  }, []);

  return (
    <ActiveMediaContextProvider value={{ activeMedia, setActiveMedia }}>
      <div className={isFormVisible ? 'product-demo__main-container' : ''}>
        <CustomAppWrapper>
          <div className="product-demo">
            <DemoVideo
              isVideoPlaying={isVideoPlaying && activeMedia === ActiveMediaPreset.DemoVideo}
            />
            <Challenges />
            <Gamification />
            <FAQ data={faqAllData} isLoading={isLoading} />
            <DetailsForm
              formError={formError}
              formValue={formValue}
              onSubmitFormClick={onSubmitFormClick}
              selectedOption={selectedOption}
              setFormError={setFormError}
              setFormValue={setFormValue}
              setSelectedOption={setSelectedOption}
            />
          </div>
        </CustomAppWrapper>
        {isFormVisible && (
          <DetailsModal
            formError={formError}
            formValue={formValue}
            onSubmitFormClick={onModalClose}
            setFormError={setFormError}
            setFormValue={setFormValue}
          />
        )}
      </div>
    </ActiveMediaContextProvider>
  );
};

export default observer(ProductDemo);
