import { useState } from 'react';
import { students as initialStudents } from '../../data';
import AddStudentForm from '../../components/organisms/AddStudentForm';

export default function StudentsPage() {
    const [studentsList, setStudentsList] = useState(initialStudents);

    const handleAddStudent = (newStudent) => {
        setStudentsList([newStudent, ...studentsList]);
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center' }}>Управління студентами</h2>

            <AddStudentForm onAddStudent={handleAddStudent} />

            <h3>Список студентів</h3>
            {studentsList.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {studentsList.map(student => (
                        <li key={student.id} style={{
                            padding: '15px',
                            borderBottom: '1px solid #ddd',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            opacity: student.isActive ? 1 : 0.6
                        }}>
                            <strong>{student.name}</strong>
                            <span>
                                Бал: <strong style={{ color: (student.score ?? 0) >= 60 ? 'green' : 'red' }}>
                                    {student.score ?? "Відсутній"}
                                </strong>
                            </span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Немає жодного студента.</p>
            )}
        </div>
    );
}
