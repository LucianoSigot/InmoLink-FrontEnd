import RegisterForm from "../organismo/RegisterForm";
import BackgroundSlider from "../BackgroundSlider";

function TemplateRegister() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#fdfcfb]">
            <BackgroundSlider />
            <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
                <div className="bg-white luxury-shadow rounded-[2.5rem] p-12 w-full max-w-lg border border-gray-50">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-['Cormorant_Garamond'] font-bold text-gray-900 mb-2">Crear una Cuenta</h1>
                        <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold">Únase a nuestra red exclusiva de propiedades</p>
                    </div>
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
}

export default TemplateRegister;
