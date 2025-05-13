import { CustomButton, CustomInputField } from 'components';
import { SPACE_REGEX } from 'constant';
import { translate } from 'locales';
import { ISubmitLeadsPayload } from 'services';
import { DetailsModalFieldPreset, IProductDetailsError, IProductDetailsValue } from 'types';
import { convertKeysToSnakeCase, isFormValid } from 'utils';

import './detailsModal-styles.scss';

interface IDetailModal {
  formError: IProductDetailsError;
  formValue: IProductDetailsValue;
  onSubmitFormClick: (payload: ISubmitLeadsPayload) => void;
  setFormValue: (value: IProductDetailsValue) => void;
  setFormError: (value: IProductDetailsError) => void;
}

const DetailsModal = (props: IDetailModal) => {
  const { formError, formValue, onSubmitFormClick, setFormError, setFormValue } = props;

  const title = translate('screens.product-demo.details-modal.title');

  const handleFormValueChange = (preset: DetailsModalFieldPreset, value: string) => {
    setFormValue({ ...formValue, [preset]: value });
    if (formError[preset]) {
      setFormError({ ...formError, [preset]: false });
    }
  };

  const handleFormSubmit = () => {
    const { isValid, formError: currentErrors } = isFormValid(formError, formValue);
    if (isValid) {
      setFormError({ email: false, companyName: false });
      const payload = convertKeysToSnakeCase(formValue);
      onSubmitFormClick(payload);
    } else {
      setFormError({ ...currentErrors });
    }
  };

  return (
    <div className="details-modal__container">
      <div className="details-modal__sub-container">
        <div className="details-modal__title">{title}</div>
        <div className="details-modal__form">
          <CustomInputField
            errorText={
              formError.email
                ? translate('screens.product-demo.details-modal.fields.email-id.error')
                : ''
            }
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
          <CustomInputField
            errorText={
              formError.companyName
                ? translate('screens.product-demo.details-modal.fields.company-name.error')
                : ''
            }
            isRequired
            label={translate('screens.product-demo.details-modal.fields.company-name.label')}
            onChange={value => handleFormValueChange(DetailsModalFieldPreset.CompanyName, value)}
            placeholder={translate(
              'screens.product-demo.details-modal.fields.company-name.placeholder',
            )}
            value={formValue.companyName}
          />
          <div className="details-modal__form__button">
            <CustomButton label={translate('common.submit')} onClick={handleFormSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
