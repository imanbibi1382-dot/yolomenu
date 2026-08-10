import { MenuItem } from '@/types';
import { useEffect, useState } from 'react';

interface UseItemFormProps {
  initialItem?: MenuItem;
}

export function useItemForm({ initialItem }: UseItemFormProps) {
  const [values, setValues] = useState<MenuItem>(
    initialItem || {
      id: `admin-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      name: '',
      englishName: '',
      price: 0,
      description: '',
      ingredients: '',
      image: '',
      tags: [],
      isAvailable: true,
      categoryId: '',
    }
  );

  const [originalValues, setOriginalValues] = useState<MenuItem>(values);
  const [isDirty, setIsDirty] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialItem) {
      setValues(initialItem);
      setOriginalValues(initialItem);
      setIsDirty(false);
    }
  }, [initialItem]);

  const updateField = <K extends keyof MenuItem>(key: K, value: MenuItem[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setIsDirty(true);
    // Clear error for this field
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!values.name.trim()) {
      newErrors.name = 'نام فارسی الزامی است';
    }
    if (!values.englishName.trim()) {
      newErrors.englishName = 'نام انگلیسی الزامی است';
    }
    if (values.price < 0) {
      newErrors.price = 'قیمت نمی‌تواند منفی باشد';
    }
    if (!values.description.trim()) {
      newErrors.description = 'توضیحات الزامی است';
    }
    if (!values.categoryId) {
      newErrors.categoryId = 'دسته‌بندی الزامی است';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setValues(originalValues);
    setIsDirty(false);
    setErrors({});
  };

  return {
    values,
    isDirty,
    errors,
    setValues,
    updateField,
    validate,
    reset,
  };
}
