import LoginForm from "../organismo/LoginForm";
import Titulo from "../atomos/Titulo";
function TemplateLogin() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
                <Titulo>Iniciar Sesion</Titulo>
                <LoginForm />
            </div>
        </div>
    );
}

export default TemplateLogin;