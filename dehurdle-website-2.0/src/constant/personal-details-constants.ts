const GENDER_OPTIONS = [
  { title: 'Male', value: 'MALE' },
  { title: 'Female', value: 'FEMALE' },
  { title: 'Others', value: 'OTHERS' },
];

const USER_DETAILS_INITIAL_STATE = {
  dateOfBirth: null,
  gender: '',
  firstName: '',
  lastName: '',
};

const USER_DETAIL_FIELD_NAME = {
  DATE_OF_BIRTH: 'dateOfBirth',
  GENDER: 'gender',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
};

export { GENDER_OPTIONS, USER_DETAIL_FIELD_NAME, USER_DETAILS_INITIAL_STATE };
