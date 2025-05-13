import { WhatsappIcon } from 'assets';
import { CustomInputField } from 'components';
import { OPTIONS_DATA, SPACE_REGEX, WHATSAPP_CONTACT } from 'constant';
import { translate } from 'locales';
import { ISubmitLeadsPayload } from 'services';
import palette from 'theme/colors';
import { DetailsModalFieldPreset, IProductDetailsError, IProductDetailsValue } from 'types';
import { convertKeysToSnakeCase, isFormValid } from 'utils';

import { Typography } from '@mui/material';

import './detailsForm-styles.scss';

interface IDetailForm {
  formError: IProductDetailsError;
  formValue: IProductDetailsValue;
  onSubmitFormClick: (payload: ISubmitLeadsPayload) => void;
  selectedOption: string;
  setFormError: (value: IProductDetailsError) => void;
  setFormValue: (value: IProductDetailsValue) => void;
  setSelectedOption: (value: string) => void;
}

const DetailsForm = (props: IDetailForm) => {
  const {
    formError,
    formValue,
    onSubmitFormClick,
    selectedOption,
    setFormError,
    setFormValue,
    setSelectedOption,
  } = props;

  const whatsAppUrl = `https://wa.me/${WHATSAPP_CONTACT}`;

  const handleFormSubmit = (option: string) => {
    const { isValid, formError: currentErrors } = isFormValid(formError, formValue);
    if (isValid) {
      setSelectedOption(option);
      setFormError({ email: false, companyName: false });
      const payload = convertKeysToSnakeCase({ ...formValue, preference: option });
      onSubmitFormClick(payload);
    } else {
      setFormError({ ...currentErrors });
    }
  };

  const handleFormValueChange = (preset: DetailsModalFieldPreset, value: string) => {
    setFormValue({ ...formValue, [preset]: value });
    if (formError[preset]) {
      setFormError({ ...formError, [preset]: false });
    }
  };

  const handleOptionsSelection = (option: string) => () => {
    handleFormSubmit(option);
  };

  const renderOptions = () => {
    return OPTIONS_DATA.map(option => {
      const isSelected = selectedOption === option.value;
      const activeContainerStyle = isSelected ? palette.lightSeaGreen : palette.aliceBlue;
      const activeTitleStyle = isSelected ? palette.aliceBlue : palette.lightSeaGreen;

      return (
        <div
          className="details-form__options-sub-container"
          key={option.id}
          onClick={handleOptionsSelection(option.value)}
          style={{ backgroundColor: activeContainerStyle }}>
          <Typography className="details-form__option-title" style={{ color: activeTitleStyle }}>
            {option.title}
          </Typography>
        </div>
      );
    });
  };

  return (
    <div className="details-form__container">
      <div>
        <Typography className="details-form__title">
          {translate('screens.product-demo.details-form.title')}
        </Typography>
        <div className="details-form__sub-container">
          <div className="details-form__input">
            <CustomInputField
              errorText={
                formError.email
                  ? translate('screens.product-demo.details-modal.fields.email-id.error')
                  : ''
              }
              inputContainerClassName="details-form__input-container"
              inputErrorClassName="details-form__error-text"
              inputTextClassName="details-form__input-text"
              isRequired
              label={translate('screens.product-demo.details-modal.fields.email-id.label')}
              onChange={value =>
                handleFormValueChange(DetailsModalFieldPreset.Email, value.replace(SPACE_REGEX, ''))
              }
              placeholder={translate(
                'screens.product-demo.details-modal.fields.email-id.placeholder',
              )}
              value={formValue.email}
            />
          </div>
          <div className="details-form__input">
            <CustomInputField
              errorText={
                formError.companyName
                  ? translate('screens.product-demo.details-modal.fields.company-name.error')
                  : ''
              }
              inputContainerClassName="details-form__input-container"
              inputErrorClassName="details-form__error-text"
              inputTextClassName="details-form__input-text"
              isRequired
              label={translate('screens.product-demo.details-modal.fields.company-name.label')}
              onChange={value => handleFormValueChange(DetailsModalFieldPreset.CompanyName, value)}
              placeholder={translate(
                'screens.product-demo.details-modal.fields.company-name.placeholder',
              )}
              value={formValue.companyName}
            />
          </div>
        </div>
        <div className="details-form__main-container">
          <Typography className="details-form__sub-title">
            {translate('screens.product-demo.details-form.sub-title')}
          </Typography>
          <Typography className="details-form__question">
            {translate('screens.product-demo.details-form.description')}
          </Typography>
        </div>
        <div className="details-form__options-container">{renderOptions()}</div>
      </div>
      <a href={whatsAppUrl} rel="noreferrer" target="_blank">
        <WhatsappIcon className="details-form__whatsapp-icon" />
      </a>
    </div>
  );
};

export default DetailsForm;
