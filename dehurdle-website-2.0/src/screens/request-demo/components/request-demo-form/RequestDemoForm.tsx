import { useState } from 'react';

import { CustomButton, CustomInputField } from 'components';
import {
  COMPANY_SIZE_OPTIONS,
  EMAIL_REGEX,
  HEARD_FROM_OPTIONS,
  InputPreset,
  MAX_LENGTHS,
  MOBILE_REGEX,
  REQUEST_DEMO_ERROR_VALUE,
  REQUEST_DEMO_FORM_VALUE,
  RequestDemoFieldPreset,
  ToastPreset,
  YOUR_QUERY_OPTIONS,
} from 'constant';
import { translate } from 'locales';
import { observer } from 'mobx-react-lite';
import { useStore } from 'models';

import emailjs from '@emailjs/browser';
import { Typography } from '@mui/material';

import './requestDemoForm-styles.scss';

const RequestDemoForm = observer(() => {
  const { viewStore } = useStore();
  const { toastStore } = viewStore;
  const { popToast } = toastStore;

  const [formValue, setFormValue] = useState(REQUEST_DEMO_FORM_VALUE);
  const [formKey, setFormKey] = useState(0);
  const [formError, setFormError] = useState(REQUEST_DEMO_ERROR_VALUE);

  const handleChange = (field: string) => (value: string) => {
    const maxLength = MAX_LENGTHS[field] ?? Infinity;
    const whitespaceStrippedValue =
      field === RequestDemoFieldPreset.firstName ||
      field === RequestDemoFieldPreset.lastName ||
      field === RequestDemoFieldPreset.email
        ? value.replace(/\s+/g, '')
        : value;

    const trimmedValue = whitespaceStrippedValue.slice(0, maxLength);

    setFormValue(prev => ({ ...prev, [field]: trimmedValue }));
    setFormError(prev => ({ ...prev, [field]: false }));
  };

  const mapToDropdownOptions = (items: string[]) =>
    items.map(item => ({
      title: item,
      value: item,
    }));

  const companySizeOptions = mapToDropdownOptions(COMPANY_SIZE_OPTIONS);
  const yourQueryOptions = mapToDropdownOptions(YOUR_QUERY_OPTIONS);
  const heardFromOptions = mapToDropdownOptions(HEARD_FROM_OPTIONS);

  const validateForm = () => {
    const errors: typeof formError = {
      companyName: !formValue.companyName.trim(),
      companySize: !formValue.companySize,
      designation: !formValue.designation.trim(),
      email: !EMAIL_REGEX.test(formValue.email),
      firstName: !formValue.firstName,
      heardFrom: !formValue.heardFrom,
      lastName: !formValue.lastName,
      mobileNumber: !MOBILE_REGEX.test(formValue.mobileNumber),
      yourQuery: !formValue.yourQuery,
    };

    setFormError(errors);
    return !Object.values(errors).includes(true);
  };

  const handleSubmit = () => {
    const serviceId = import.meta.env.VITE_EMAIL_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

    const {
      companyName,
      companySize,
      designation,
      email,
      firstName,
      heardFrom,
      lastName,
      mobileNumber,
      yourQuery,
    } = formValue;

    const templateParams = {
      company_name: companyName,
      company_size: companySize,
      designation: designation,
      first_name: firstName,
      heard_from: heardFrom,
      last_name: lastName,
      mobile_number: mobileNumber,
      query: yourQuery,
      // title: 'Request for demo', // TODO:: Ask what should the title or subject of email, may be missing field
      work_email: email,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey).then(
      () => {
        popToast({
          type: ToastPreset.Success,
          subTitle: translate('content.EMAIL_SENT_SUCCESS.message'), // TODO:: confirm the success message and add to translation
        });
        setFormValue(REQUEST_DEMO_FORM_VALUE);
        setFormKey(prev => prev + 1); // force re-render of all fields (dropdown)
      },
      error => {
        popToast({
          type: ToastPreset.Error,
          subTitle: error.text,
        });
      },
    );
  };

  const getFieldError = (field: keyof typeof formError, translationKey: string) =>
    formError[field]
      ? translate(`screens.demo.request-demo-form.fields.${translationKey}.error`)
      : '';

  const onRequestDemoClick = () => {
    if (validateForm()) {
      handleSubmit();
    }
  };

  return (
    <>
      <Typography className="request-demo-form__title">
        {translate('screens.demo.request-demo-form.title')}
      </Typography>
      <div className="request-demo-form__container">
        {/* <div className="request-demo-form__header">
          <Typography className="request-demo-form__description">
          {translate('screens.demo.request-demo-form.description')}
        </Typography>
        </div> */}
        <div className="request-demo-form__form-container">
          <div className="request-demo-form__details-container">
            <Typography className="request-demo-form__details-header">
              {translate('screens.demo.request-demo-form.information')}
            </Typography>
            <div className="request-demo-form__sub-container">
              <div className="request-demo-form__input">
                <CustomInputField
                  errorText={getFieldError(RequestDemoFieldPreset.firstName, 'first-name')}
                  inputContainerClassName="request-demo-form__input-container"
                  inputTextClassName="request-demo-form__input-text"
                  isRequired
                  label={translate('screens.demo.request-demo-form.fields.first-name.label')}
                  onChange={handleChange(RequestDemoFieldPreset.firstName)}
                  placeholder={translate(
                    'screens.demo.request-demo-form.fields.first-name.placeholder',
                  )}
                  value={formValue.firstName}
                />
              </div>
              <div className="request-demo-form__input">
                <CustomInputField
                  errorText={getFieldError(RequestDemoFieldPreset.lastName, 'last-name')}
                  inputContainerClassName="request-demo-form__input-container"
                  inputTextClassName="request-demo-form__input-text"
                  isRequired
                  label={translate('screens.demo.request-demo-form.fields.last-name.label')}
                  onChange={handleChange(RequestDemoFieldPreset.lastName)}
                  placeholder={translate(
                    'screens.demo.request-demo-form.fields.last-name.placeholder',
                  )}
                  value={formValue.lastName}
                />
              </div>
            </div>
            <div className="request-demo-form__input">
              <CustomInputField
                errorText={getFieldError(RequestDemoFieldPreset.email, 'work-email')}
                inputContainerClassName="request-demo-form__input-container"
                inputTextClassName="request-demo-form__input-text"
                isRequired
                label={translate('screens.demo.request-demo-form.fields.work-email.label')}
                onChange={handleChange(RequestDemoFieldPreset.email)}
                placeholder={translate(
                  'screens.demo.request-demo-form.fields.work-email.placeholder',
                )}
                value={formValue.email}
              />
            </div>
            <div className="request-demo-form__input">
              <CustomInputField
                errorText={getFieldError(RequestDemoFieldPreset.mobileNumber, 'mobile-number')}
                inputContainerClassName="request-demo-form__input-container"
                inputTextClassName="request-demo-form__input-text"
                isRequired
                label={translate('screens.demo.request-demo-form.fields.mobile-number.label')}
                onChange={handleChange(RequestDemoFieldPreset.mobileNumber)}
                placeholder={translate(
                  'screens.demo.request-demo-form.fields.mobile-number.placeholder',
                )}
                type={InputPreset.Number}
                value={formValue.mobileNumber}
              />
            </div>
          </div>
          <div className="request-demo-form__details-container">
            <Typography className="request-demo-form__details-header">
              {translate('screens.demo.request-demo-form.company')}
            </Typography>
            <div className="request-demo-form__input">
              <CustomInputField
                errorText={getFieldError(RequestDemoFieldPreset.companyName, 'company-name')}
                inputContainerClassName="request-demo-form__input-container"
                inputTextClassName="request-demo-form__input-text"
                isRequired
                label={translate('screens.demo.request-demo-form.fields.company-name.label')}
                onChange={handleChange(RequestDemoFieldPreset.companyName)}
                placeholder={translate(
                  'screens.demo.request-demo-form.fields.company-name.placeholder',
                )}
                value={formValue.companyName}
              />
            </div>
            <div className="request-demo-form__input">
              <CustomInputField
                errorText={getFieldError(RequestDemoFieldPreset.designation, 'designation')}
                inputContainerClassName="request-demo-form__input-container"
                inputTextClassName="request-demo-form__input-text"
                isRequired
                label={translate('screens.demo.request-demo-form.fields.designation.label')}
                onChange={handleChange(RequestDemoFieldPreset.designation)}
                placeholder={translate(
                  'screens.demo.request-demo-form.fields.designation.placeholder',
                )}
                value={formValue.designation}
              />
            </div>
            <div className="request-demo-form__input">
              <CustomInputField
                dropdownModalButtonLabel={translate('common.done')}
                dropdownModalTitle={translate(
                  'screens.demo.request-demo-form.fields.company-size.label',
                )}
                errorText={getFieldError(RequestDemoFieldPreset.companySize, 'company-size')}
                inputContainerClassName="request-demo-form__input-container"
                inputTextClassName="request-demo-form__input-text"
                isRequired
                key={formKey + '-companySize'}
                label={translate('screens.demo.request-demo-form.fields.company-size.label')}
                onChange={handleChange(RequestDemoFieldPreset.companySize)}
                options={companySizeOptions}
                placeholder={translate(
                  'screens.demo.request-demo-form.fields.company-size.placeholder',
                )}
                type={InputPreset.Dropdown}
                value={formValue.companySize}
              />
            </div>
          </div>
          <div className="request-demo-form__details-container">
            <Typography className="request-demo-form__details-header">
              {translate('screens.demo.request-demo-form.fields.your-query.title')}
            </Typography>
            <div className="request-demo-form__sub-container">
              <div className="request-demo-form__input">
                <CustomInputField
                  dropdownModalButtonLabel={translate('common.done')}
                  dropdownModalTitle={translate(
                    'screens.demo.request-demo-form.fields.your-query.label',
                  )}
                  errorText={getFieldError(RequestDemoFieldPreset.yourQuery, 'your-query')}
                  inputContainerClassName="request-demo-form__input-container"
                  inputTextClassName="request-demo-form__input-text"
                  isRequired
                  key={formKey + '-yourQuery'}
                  label={translate('screens.demo.request-demo-form.fields.your-query.label')}
                  onChange={handleChange(RequestDemoFieldPreset.yourQuery)}
                  options={yourQueryOptions}
                  placeholder={translate(
                    'screens.demo.request-demo-form.fields.your-query.placeholder',
                  )}
                  type={InputPreset.Dropdown}
                  value={formValue.yourQuery}
                />
              </div>
            </div>
          </div>
          <div className="request-demo-form__details-container">
            <Typography className="request-demo-form__details-header">
              {translate('screens.demo.request-demo-form.fields.how-did-you-hear.title')}
            </Typography>
            <div className="request-demo-form__sub-container">
              <div className="request-demo-form__input">
                <CustomInputField
                  dropdownModalButtonLabel={translate('common.done')}
                  dropdownModalTitle={translate(
                    'screens.demo.request-demo-form.fields.how-did-you-hear.title',
                  )}
                  errorText={getFieldError(RequestDemoFieldPreset.heardFrom, 'how-did-you-hear')}
                  inputContainerClassName="request-demo-form__input-container"
                  inputTextClassName="request-demo-form__input-text"
                  isRequired
                  key={formKey + '-heardFrom'}
                  label={translate('screens.demo.request-demo-form.fields.how-did-you-hear.label')}
                  onChange={handleChange(RequestDemoFieldPreset.heardFrom)}
                  options={heardFromOptions}
                  placeholder={translate(
                    'screens.demo.request-demo-form.fields.how-did-you-hear.placeholder',
                  )}
                  type={InputPreset.Dropdown}
                  value={formValue.heardFrom}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="request-demo-form__footer-container">
          {/* <Typography className="request-demo-form__footer-text">
          {translate('screens.demo.request-demo-form.policy')}
        </Typography> */}
          <CustomButton
            buttonTextClassName="request-demo-form__footer-button"
            buttonContainerClassName="request-demo-form__footer-button-container"
            label={translate('common.submit')}
            onClick={onRequestDemoClick}
          />
        </div>
      </div>
    </>
  );
});

export default RequestDemoForm;
