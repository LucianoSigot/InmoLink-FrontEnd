import RegisterForm from "../organismo/RegisterForm";
import Titulo from "../atomos/Titulo";

function TemplateRegister() {
    return (
        <div className="min-h-screen bg-[#fdfcfb] flex items-center justify-center p-6">
            <div className="bg-white luxury-shadow rounded-[2.5rem] p-12 w-full max-w-lg border border-gray-50">
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-['Cormorant_Garamond'] font-bold text-gray-900 mb-2">Crear una Cuenta</h1>
                    <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold">Únase a nuestra red exclusiva de propiedades</p>
                </div>
                <RegisterForm />
            </div>
        </div>
    );
}

export default TemplateRegister;
