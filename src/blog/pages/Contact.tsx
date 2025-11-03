import { useState, useEffect } from 'react'; 
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { sendContact } from '../api/contactApi';
import StatsPanel from '../components/StatsPanel';
import TextField from '../components/TextField';
import TextArea from '../components/TextArea';
import Loader from '../components/Loader'; 
import { useNavigate } from 'react-router-dom'; 

const schema = z.object({
  name: z.string().min(2, { message: 'Nombre requerido (mín. 2 chars).' }),
  email: z.string().email({ message: 'Email inválido.' }),
  subject: z.string().min(3, { message: 'Asunto requerido (mín. 3 chars).' }),
  message: z.string().min(10, { message: 'Mensaje requerido (mín. 10 chars).' }).max(2000, { message: 'Máximo 2000 caracteres.' }),
  budget: z.string().optional(),
  
  consent: z.custom<boolean>((val) => {
    if (typeof val !== 'boolean' || val === false) {
      return false; 
    }
    return true;
  }, { message: 'Debes aceptar la política de privacidad.' }) 
});

export type ContactPayload = z.infer<typeof schema>;

interface AlertState {
    visible: boolean;
    type: 'success' | 'queued' | 'error';
    message: string;
}

const backgroundImageURL = '/img/imagebg.png'; 

export default function Contact() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset 
  } = useForm<ContactPayload>({ 
    resolver: zodResolver(schema),
    defaultValues: { budget: '' }
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true); 
  const [alert, setAlert] = useState<AlertState>({ visible: false, type: 'success', message: '' });

  const showAlert = (type: AlertState['type'], message: string) => {
      setAlert({ visible: true, type, message });
  };

  useEffect(() => {
    const loadTimer = setTimeout(() => {
        setIsLoading(false); 
    }, 1500); 

    if (alert.visible) {
        const alertTimer = setTimeout(() => {
            setAlert(prev => ({ ...prev, visible: false }));
        }, 5000);
        return () => { 
            clearTimeout(alertTimer);
        };
    }
    
    return () => clearTimeout(loadTimer); 
  }, [alert.visible]);


  const onSubmit = async (data: ContactPayload) => {
    const idempotencyKey = crypto.randomUUID();
    setAlert({ ...alert, visible: false });

    try {
      await sendContact(data, idempotencyKey);
      showAlert('success', '¡Mensaje enviado con éxito! Recibirás una respuesta pronto.');
      reset(); 
    } catch (error: any) {
      if (error.message === 'OFFLINE_QUEUED') {
          showAlert('queued', 'Sin conexión: Tu mensaje ha sido encolado y se enviará automáticamente al volver a tener red.');
          reset(); 
      } else {
          showAlert('error', 'Error al enviar. Por favor, revisa la consola para más detalles.');
      }
    }
  };

  const FloatingAlert = () => {
    if (!alert.visible) return null;
    
    let colorClass = '';
    let icon = '';
    
    switch (alert.type) {
        case 'success':
            colorClass = 'bg-green-600/90 text-white';
            icon = '✅';
            break;
        case 'queued':
            colorClass = 'bg-yellow-600/90 text-gray-900';
            icon = '⏳';
            break;
        case 'error':
            colorClass = 'bg-red-600/90 text-white';
            icon = '❌';
            break;
    }

    return (
        <div 
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-2xl font-semibold max-w-sm cursor-pointer transition-opacity duration-300 ${colorClass}`}
            onClick={() => setAlert(prev => ({ ...prev, visible: false }))}
        >
            {icon} {alert.message}
        </div>
    );
  }
  
  if (isLoading) {
    return <Loader />; 
  }

  return (
    <div 
        className="animate-bg-shift flex justify-center items-center min-h-screen p-4 overflow-hidden relative"
        style={{ 
            fontFamily: 'Inter, sans-serif',
            background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('${backgroundImageURL}') no-repeat center center`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundBlendMode: 'multiply', 
        }}
    >
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

        <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute w-60 h-60 bg-blue-500/10 rounded-full blur-2xl animate-float-slow opacity-60" style={{ top: '10%', left: '15%' }}></div>
            <div className="absolute w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-float-slow-delay opacity-50" style={{ bottom: '20%', right: '10%' }}></div>
        </div>

        <FloatingAlert />

        <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row shadow-2xl rounded-lg overflow-hidden border border-gray-700/50">
            
            <div className="flex-1 p-8 bg-gray-800 text-white md:border-r border-gray-700/50">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-indigo-400">Contacta con Nosotros</h1>
                    
                </div>
                <p className="text-gray-400 mb-8 text-sm">
                    Envíanos un mensaje y te responderemos tan pronto como sea posible.
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    
                    <TextField 
                        label="Nombre Completo" 
                        id="name" 
                        type="text" 
                        placeholder="Tu nombre o el de tu empresa"
                        {...register('name')} 
                        error={errors.name} 
                        
                    />
                    <TextField 
                        label="Email de Contacto" 
                        id="email" 
                        type="email" 
                        placeholder="ejemplo@dominio.com"
                        {...register('email')} 
                        error={errors.email} 
                    />
                    <TextField 
                        label="Asunto" 
                        id="subject" 
                        type="text" 
                        placeholder="Consulta sobre proyecto / presupuesto"
                        {...register('subject')} 
                        error={errors.subject} 
                    />
                    
                    <TextArea
                        label="Mensaje"
                        id="message"
                        rows={6}
                        maxLength={2000} 
                        placeholder="Detalla tu requerimiento aquí (mínimo 10 caracteres)."
                        {...register('message')}
                        error={errors.message}
                    />
                    
                    <TextField 
                        label="Presupuesto Estimado (Opcional)" 
                        id="budget" 
                        type="text" 
                        placeholder="Ej: $500 - $1000 USD"
                        {...register('budget')} 
                        error={errors.budget} 
                    />

                    <div className="flex items-start pt-2">
                        <input id="consent" type="checkbox" {...register('consent')} className="mt-1 mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500" />
                        <label htmlFor="consent" className="text-sm font-medium text-gray-400">Acepto la política de privacidad y tratamiento de datos.</label>
                    </div>
                    {errors.consent && (
                        <small className="text-red-400 block mt-1">
                            {(errors.consent as any)?.message}
                        </small>
                    )}

                    <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className={`w-full py-3 rounded-lg font-bold text-white shadow-lg shadow-indigo-700/30 transition duration-200 ease-in-out transform active:scale-[0.99] ${
                            isSubmitting ? 'bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-300'
                        }`}
                    >
                        {isSubmitting ? 'Enviando y reintentando...' : 'Enviar Mensaje'}
                    </button>
                </form>
            </div>
            
            <div className="md:w-1.5/3 p-8 bg-gray-900 flex flex-col justify-between items-center">
                <StatsPanel /> 
                <button
                    onClick={() => navigate('/profile')} 
                    className="mt-6 w-full py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    ⬅ Regresar a Perfil
                </button>
            </div>
        </div>
      </div>
  );
}
