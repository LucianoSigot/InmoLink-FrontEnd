import LoginForm from "../organismo/LoginForm";
import Titulo from "../atomos/Titulo";
function TemplateLogin() {
    return (
        <div className="min-h-screen bg-[#fdfcfb] flex items-center justify-center p-6">
            <div className="bg-white luxury-shadow rounded-[2.5rem] p-12 w-full max-w-lg border border-gray-50">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-['Cormorant_Garamond'] font-bold text-gray-900 mb-2">Bienvenido a InmoLink</h1>
                    <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold">Inicie sesión en su portal exclusivo</p>
                </div>
                <LoginForm />
            </div>
        </div>
    );
}

export default TemplateLogin;