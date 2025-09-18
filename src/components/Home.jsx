import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { 
  Send, 
  List, 
  Code, 
  FileText, 
  Plus,
  Trash2
} from 'lucide-react'
import axios from 'axios'


// Componente de Loading Inovador
const InnovativeLoader = ({ size = 'md', message = 'Carregando...' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  }
  
  return (
    <div className="flex flex-col items-center justify-center space-y-3">
      <div className="relative">
        {/* Círculo externo pulsante com gradiente */}
        <div className={`${sizeClasses[size]} rounded-full border-4 border-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin`}>
          <div className="absolute inset-1 bg-white dark:bg-slate-800 rounded-full"></div>
        </div>
        
        {/* Núcleo central com animação de escala */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
        </div>
        
        {/* Partículas orbitais */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s', animationDirection: 'reverse' }}>
          <div className="absolute -top-1 left-1/2 w-1 h-1 bg-blue-400 rounded-full transform -translate-x-1/2 animate-ping"></div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: '1.5s' }}>
          <div className="absolute top-1/2 -right-1 w-1 h-1 bg-purple-400 rounded-full transform -translate-y-1/2 animate-ping"></div>
        </div>
        
        {/* Anel de progresso */}
        <div className="absolute inset-0 rounded-full">
          <svg className={`${sizeClasses[size]} transform -rotate-90`}>
            <circle
              cx="50%"
              cy="50%"
              r="45%"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeDasharray="50 50"
              className="animate-spin"
              style={{ animationDuration: '3s' }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      
      {/* Texto de carregamento com efeito de typing */}
      {message && (
        <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          <span className="inline-block animate-pulse">{message}</span>
          <span className="inline-block animate-bounce ml-1">...</span>
        </div>
      )}
    </div>
  )
}

function Home({ isDarkMode, toggleTheme, ThemeToggleButton }) {
  const navigate = useNavigate()
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [viewMode, setViewMode] = useState('list')
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState('')
  const [newTasks,setNewTasks] = useState([])

 
  useEffect(() => {
  const chave = sessionStorage.getItem("chave");

  if (!chave) {
    navigate('/');
    return;
  }

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      setMessage('');

      const response = await axios.get('https://vinixodin.com/api/cronometrar3');
      const userReceiver = response.data.receivers.find(receiver => receiver.email === chave);

      if (userReceiver && Array.isArray(userReceiver.tarefas)) {
        setTasks(userReceiver.tarefas || []);
        setMessage('Tarefas carregadas com sucesso!');
        setNewTasks(tasks)
      } else {
        setTasks([]);
        setMessage('Nenhuma tarefa encontrada para o usuário.');
        setNewTasks(tasks)
      }
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
      setTasks([]);
      setNewTasks(tasks)
      setMessage('Erro ao conectar com o servidor. Tente novamente.');
    } finally {

      setIsLoading(false);
    }
  };

  fetchTasks();

  if (typeof localStorage !== 'undefined') {
    const prompt = localStorage.getItem("prompt");
    if (prompt) {
      setNewTask(prompt);
    }
  }
}, []);

 const handleToggleEdit = async () => {
  if (isEditing) {
    try {
      setIsLoading(true);
      setMessage('');

      // Salvar as tarefas
      const response = await axios.post('https://vinixodin.com/api/cronometrar3', {
        email: sessionStorage.getItem("chave"),
        tarefas: newTasks
      });

      if (response.data.mensagem === 'sucesso') {
        setMessage('Tarefas salvas com sucesso!');

        // Recarregar as tarefas do servidor
        const fetchResponse = await axios.get('https://vinixodin.com/api/cronometrar3');
        const userReceiver = fetchResponse.data.receivers.find(receiver => receiver.email === sessionStorage.getItem("chave"));

        if (userReceiver && Array.isArray(userReceiver.tarefas)) {
          setTasks(userReceiver.tarefas || []);
          setMessage('Tarefas salvas e recarregadas com sucesso!');
        } else {
          setNewTasks(tasks)
          setMessage('Nenhuma tarefa encontrada para o usuário após salvar.');
        }
      } else {
        setNewTasks(tasks)
        setMessage('Erro ao salvar as tarefas.');
      }
    } catch (error) {
      console.error('Erro:', error);
      setMessage('Erro ao conectar com o servidor. Tente novamente.');
    } finally {
      setNewTasks(tasks)
      setIsLoading(false);
    }
  }
  setIsEditing(!isEditing);
  
}

const handleSubmit = async (e) => {
  localStorage.setItem(newTask)

  if (!newTask.trim()) return;

  setIsLoading(true);
  setMessage('');

  try {
    // Primeira requisição para flask232
    const response1 = await axios.post('https://flask232.onrender.com', {
      planning: newTask
    });

    const tarefasGeradas = response1.data;

    if(!JSON.stringify(tarefasGeradas)){
       setMessage("inteligencia artificial falhou, tente novamente")
      return
    }
    // Segunda requisição para /cronometrar3
    const response2 = await axios.post('https://vinixodin.com/api/cronometrar3', {
      email: sessionStorage.getItem("chave"),
      tarefas: tarefasGeradas
    });

     if (response2.data.mensagem === 'sucesso') {
        setMessage('Tarefas salvas com sucesso!');

        // Recarregar as tarefas do servidor
        const fetchResponse = await axios.get('https://vinixodin.com/api/cronometrar3');
        const userReceiver = fetchResponse.data.receivers.find(receiver => receiver.email === sessionStorage.getItem("chave"));

        if (userReceiver && Array.isArray(userReceiver.tarefas)) {
          setTasks(userReceiver.tarefas || []);

          setMessage('Tarefas salvas e recarregadas com sucesso!');
        } else {
          setNewTasks(tasks)
          setMessage('Nenhuma tarefa encontrada para o usuário após salvar.');
        }
      } else {
        setNewTasks(tasks)
        setMessage('Erro ao salvar as tarefas.');
      }
  } catch (error) {
    setTasks([])
    setNewTasks([])
    setMessage('Erro ao conectar com o servidor. Tente novamente.');
  } finally {
    setNewTasks(tasks)
    setIsLoading(false);
  }
};

const deleteTask = async (label) => {
  try {
    setIsLoading(true);
    setMessage('');

    const response = await axios.post('https://vinixodin.com/api/apagarCronometrar3', {
      email: sessionStorage.getItem("chave"),
      label: label
    });

    if (response.data.mensagem === 'sucesso') {
      setTasks((prevTasks) => prevTasks.filter((task) => task.label !== label));
      setMessage('Tarefa excluída com sucesso!');
      setNewTasks(tasks)
    } else {
      setMessage('Erro ao excluir a tarefa.');
    }
  } catch (error) {
    console.error('Erro:', error);
    setMessage('Erro ao conectar com o servidor. Tente novamente.');
  } finally {
    setIsLoading(false);
  }
}

  const renderTasks = () => {
    if (isLoading) {
    return (
      <div className="py-10">
        <InnovativeLoader size="md" message="Carregando suas metas" />
      </div>
    );
  }
    if (viewMode === 'json') {
      return (
      <div className="relative">
        
        <button
          onClick={handleToggleEdit}
          className="absolute top-2 right-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          {isEditing ? 'Concluir' : 'Editar'}
        </button>


        {isEditing ? (
          <textarea
            className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-sm overflow-auto max-h-96 text-slate-800 dark:text-slate-200 w-full font-mono"
            value={newTasks}
            onChange={(e) => setNewTasks(e.target.value)}
          />
        ) : (
          <pre
          className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-sm overflow-auto max-h-96 text-slate-800 dark:text-slate-200"
          style={{ whiteSpace: 'pre' }}
        >
          {JSON.stringify(tasks, null, 2)}
        </pre>
        )}
      </div>
    );
    }

    if (viewMode === 'prompt') {
      const prompt = newTask.length > 0 
        ? `último prompt:\n\n${newTask}`
        : 'Nenhuma tarefa cadastrada ainda.'

      return (
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-sm max-h-96 overflow-auto">
          <p className="whitespace-pre-wrap text-slate-800 dark:text-slate-200">{prompt}</p>
        </div>
      )
    }


    return (
      <div className="space-y-3 max-h-96 overflow-auto">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <List className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Nenhuma meta cadastrada ainda.</p>

          </div>
        ) : (
          tasks.map((task) => (
            <div
                key={task.label}
                className="p-3 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200"
            >
                <div className="flex items-center justify-between">
                <div>
                <h3 className="text-lg font-semibold">{task.label}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                Início: {task.start_date}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                Fim: {task.end_date} às {task.time}
                </p>
                </div>
                <button
                    onClick={() => deleteTask(task.label)}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
                </div>
            </div>
            ))
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen transition-all duration-500">
    
      <ThemeToggleButton />


      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        </div>
      </div>


      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

 
      <div className="relative z-10 min-h-screen p-4">
        <div className="w-full px-[1vw] py-[1vh]">
      
          <div className="text-center mb-8 pt-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Gerenciador de metas
            </h1>

          </div>

   
          <div className="flex justify-center mb-6">
            <div className="flex bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-lg p-1 border border-white/20 dark:border-slate-700/50">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'list'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100'
                }`}
              >
                <List className="w-4 h-4" />
                <span>Lista</span>
              </button>
              <button
                onClick={() => setViewMode('json')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'json'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100'
                }`}
              >
                <Code className="w-4 h-4" />
                <span>JSON</span>
              </button>
              <button
                onClick={() => setViewMode('prompt')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'prompt'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Prompt</span>
              </button>
            </div>
          </div>


          <Card className="mb-6 backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border-white/20 dark:border-slate-700/50 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                <List className="w-5 h-5" />
                <span>Suas Metas</span>
    
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderTasks()}
            </CardContent>
          </Card>

   
          <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border-white/20 dark:border-slate-700/50 shadow-2xl">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="flex space-x-3">
                <div className="flex-1 relative">
                  <Plus className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Descreva as suas metas  - nome, data, horário e data inicial opcional"
                    className="pl-10 h-12 border-slate-200 dark:border-slate-600 focus:border-blue-500 dark:focus:border-blue-400 transition-colors"
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !newTask.trim()}
                  className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
                    {message && (
      <div className={`p-3 rounded-lg text-sm text-center ${
        message.includes('Erro') 
          ? 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800' 
          : 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800'
      }`}>
        {message}
      </div>
    )}
        </div>
      </div>

    </div>
  )
}

export default Home