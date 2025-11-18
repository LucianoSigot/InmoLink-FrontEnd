import LoginFields from "../moleculas/LoginFields";
import Button from "../atomos/Button";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { LinkText } from "../atomos/LinkText";
function RegisterForm() {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (field, value) => {
        setForm({ ...form, [field]: value });
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await fetch("http://localhost:4000/api/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form)
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                setError(data.msg || 'Error al registrarse');
                return;
            }
            navigate("/login");
        } catch (err) {
            setError('Error de conexión: ' + err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <form className="space-y-6 " onSubmit={handleSubmit}>
            <LoginFields
                email={form.email}
                password={form.password}
                onChange={handleChange}
            />
            <LinkText text="¿Ya tienes cuenta?" linkText="Logeate" to="/login"/>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <Button type="submit" disabled={loading} className="mx-auto block">
                {loading ? 'Cargando...' : 'Registrarse'}
            </Button>
        </form>
    );
}

export default RegisterForm;