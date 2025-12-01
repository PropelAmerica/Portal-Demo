export const REQUIREMENT_FORM_URLS = {
  vaccine: 'https://propelamerica.formstack.com/forms/covid_vaccine_application',
  grad: 'https://propelamerica.formstack.com/forms/proof_of_hs_ged',
  insurance: 'https://propelamerica.formstack.com/forms/health_insurance_admissions',
  test: 'https://propelamerica.formstack.com/forms/test_form',
};

export const REQUIREMENT_HELP_TEXT = {
  vaccine: `To obtain your COVID-19 vaccination record:

1. Check with your healthcare provider or pharmacy where you received your vaccine
2. Visit your state's immunization information system (IIS)
3. Request a copy of your CDC vaccination card
4. Some states offer digital vaccine records through apps like SMART Health Card

If you've lost your vaccination card, contact the vaccination provider directly or your state health department.`,

  grad: `To obtain proof of high school graduation or GED:

1. For High School Diploma:
   - Contact your high school's registrar office
   - Request an official transcript or diploma copy
   - Some schools offer digital records through Parchment or National Student Clearinghouse

2. For GED:
   - Visit your state's GED testing service website
   - Request an official transcript
   - Contact the testing center where you took the exam

Most records can be requested online and sent electronically.`,

  insurance: `To obtain proof of health insurance:

1. Contact your insurance provider directly
2. Log into your insurance company's online portal
3. Request a current insurance card or coverage letter
4. Download your insurance card from your provider's mobile app

Your proof of insurance should include:
- Policy holder name
- Policy number
- Coverage dates
- Insurance company name and contact information`,

  test: `This is test requirement help text.

Please follow the instructions provided by your program administrator for this requirement.

If you have questions, contact support for assistance.`,
};

export const getFormUrlForRequirement = (requirementName) => {
  const nameLower = requirementName.toLowerCase();

  if (nameLower.includes('vacc')) {
    return REQUIREMENT_FORM_URLS.vaccine;
  }
  if (nameLower.includes('grad')) {
    return REQUIREMENT_FORM_URLS.grad;
  }
  if (nameLower.includes('insurance')) {
    return REQUIREMENT_FORM_URLS.insurance;
  }
  if (nameLower.includes('test')) {
    return REQUIREMENT_FORM_URLS.test;
  }

  return null;
};

export const getHelpTextForRequirement = (requirementName) => {
  const nameLower = requirementName.toLowerCase();

  if (nameLower.includes('vacc')) {
    return REQUIREMENT_HELP_TEXT.vaccine;
  }
  if (nameLower.includes('grad')) {
    return REQUIREMENT_HELP_TEXT.grad;
  }
  if (nameLower.includes('insurance')) {
    return REQUIREMENT_HELP_TEXT.insurance;
  }
  if (nameLower.includes('test')) {
    return REQUIREMENT_HELP_TEXT.test;
  }

  return 'No help information available for this requirement. Please contact support for assistance.';
};
