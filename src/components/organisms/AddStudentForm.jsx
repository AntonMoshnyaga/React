import { useState } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const validate = (values) => {
    const errors = {};

    if (!values.name.trim()) {
        errors.name = "Ім'я є обов'язковим для заповнення";
    } else if (values.name.trim().length < 2) {
        errors.name = "Ім'я повинно містити принаймні 2 символи";
    }

    if (values.score === "") {
        errors.score = "Будь ласка, введіть бал";
    } else if (isNaN(values.score) || Number(values.score) < 0 || Number(values.score) > 100) {
        errors.score = "Бал повинен бути числом від 0 до 100";
    }

    return errors;
};

export default function AddStudentForm({ onAddStudent }) {
    const [formData, setFormData] = useState({ name: '', score: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Блокування букв в інпуті. Ми залишаємо тільки цифри (перевірка типу вводу).
        if (name === 'score' && value !== '' && isNaN(Number(value))) {
            return;
        }

        setFormData({ ...formData, [name]: value });

        // Очищення помилки
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate(formData);

        if (Object.keys(validationErrors).length === 0) {
            onAddStudent({
                id: Date.now(),
                name: formData.name.trim(),
                score: Number(formData.score),
                isActive: true
            });
            setFormData({ name: '', score: '' });
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    // Перевірка, чи форма заповнена коректно для розблокування кнопки
    const isFormValid = formData.name.trim().length >= 2 &&
        formData.score !== '' &&
        !isNaN(formData.score) &&
        Number(formData.score) >= 0 &&
        Number(formData.score) <= 100;

    const isButtonDisabled = !isFormValid;

    return (
        <form onSubmit={handleSubmit} style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3 style={{ marginTop: 0 }}>Додати нового студента</h3>

            <Input
                label="Прізвище та ім'я:"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Введіть ПІБ"
            />
            {errors.name && <p style={{ color: 'red', margin: '-10px 0 15px 0', fontSize: '14px' }}>{errors.name}</p>}

            <Input
                label="Бал студента:"
                name="score"
                type="number"
                value={formData.score}
                onChange={handleChange}
                placeholder="0-100"
            />
            {errors.score && <p style={{ color: 'red', margin: '-10px 0 15px 0', fontSize: '14px' }}>{errors.score}</p>}

            <Button type="submit" disabled={isButtonDisabled}>Додати студента</Button>
        </form>
    );
}
