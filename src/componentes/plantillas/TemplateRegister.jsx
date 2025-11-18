import RegisterForm from "../organismo/RegisterForm";
import Titulo from "../atomos/Titulo";

function TemplateRegister() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
                <Titulo>Registrarse</Titulo>
                <RegisterForm />
            </div>
        </div>
    );
}

export default TemplateRegister;
