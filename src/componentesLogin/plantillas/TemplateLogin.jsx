import LoginForm from "../organismo/LoginForm";
import BackgroundSlider from "../BackgroundSlider";

function TemplateLogin() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-[#fdfcfb]">
            <BackgroundSlider />
            <div className="relative z-10 flex min-h-screen items-center justify-center p-6">
                <div className="bg-white luxury-shadow rounded-[2.5rem] p-12 w-full max-w-lg border border-gray-50">
                    <div className="text-center mb-10">
                        <h1 className="text-4xl font-['Cormorant_Garamond'] font-bold text-gray-900 mb-2">Bienvenido a InmoLink</h1>
                        <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold">Encuentra tu próximo hogar con nosotros</p>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}

export default TemplateLogin;