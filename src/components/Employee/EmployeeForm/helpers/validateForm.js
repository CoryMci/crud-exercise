export default function validateForm(formData) {
  const errors = {};

  const idPattern = /^\d{1,4}$/;
  if (!formData.id || !idPattern.test(formData.id)) {
    errors.id = "ID must be between 1 and 4 digits.";
  }

  const codePattern = /^[A-Z]\d{3}$/;
  if (!formData.code || !codePattern.test(formData.code)) {
    errors.code = "Code should be a capital letter followed by 3 digits.";
  }

  const wordPattern = /^[a-z A-Z]{3,25}$/;
  if (!formData.name || !wordPattern.test(formData.name)) {
    errors.name = "Name should be between 3 and 25 letters.";
  }

  if (!formData.profession || !wordPattern.test(formData.profession)) {
    errors.profession = "Profession should be between 3 and 25 letters.";
  }

  if (!formData.branch || !wordPattern.test(formData.branch)) {
    errors.branch = "Branch should be between 3 and 25 letters.";
  }

  if (!formData.city || !wordPattern.test(formData.city)) {
    errors.city = "City should be between 3 and 25 letters.";
  }

  return errors;
}
