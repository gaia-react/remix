export const canUseDOM = !!(
  typeof window !== 'undefined' && window.document?.createElement
);

export const compactFormData = (formData: FormData) => {
  const next = new FormData();

  formData.forEach((value, key) => {
    if (value) {
      next.append(key, value);
    }
  });

  return next;
};
