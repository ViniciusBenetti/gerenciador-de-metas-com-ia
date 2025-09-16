import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  Send, 
  List, 
  Code, 
  FileText, 
  Plus,
  CheckCircle2,
  Clock,
  Trash2
} from 'lucide-react'

function Home({ isDarkMode, toggleTheme, ThemeToggleButton }) {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [viewMode, setViewMode] = useState('list') // 'list', 'json', 'prompt'
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newTask.trim()) return

    setIsLoading(true)
    
    // Simular processamento
    setTimeout(() => {
      const task = {
        id: Date.now(),
        text: newTask,
        completed: false,
        createdAt: new Date().toISOString()
      }
      
      setTasks(prev => [...prev, task])
      setNewTask('')
      setIsLoading(false)
    }, 500)
  }

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const renderTasks = () => {
    if (viewMode === 'json') {
      return (
        <pre className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-sm overflow-auto max-h-96 text-slate-800 dark:text-slate-200">
          {JSON.stringify(tasks, null, 2)}
        </pre>
      )
    }

    if (viewMode === 'prompt') {
      const prompt = tasks.length > 0 
        ? `Aqui estão as tarefas do usuário:\n\n${tasks.map((task, index) => 
            `${index + 1}. ${task.text} ${task.completed ? '✅' : '⏳'}`
          ).join('\n')}\n\nTotal: ${tasks.length} tarefas (${tasks.filter(t => t.completed).length} concluídas)`
        : 'Nenhuma tarefa cadastrada ainda.'

      return (
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-sm max-h-96 overflow-auto">
          <p className="whitespace-pre-wrap text-slate-800 dark:text-slate-200">{prompt}</p>
        </div>
      )
    }

    // Default list view
    return (
      <div className="space-y-3 max-h-96 overflow-auto">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400">
            <List className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Nenhuma rotina cadastrada ainda.</p>
            <p className="text-sm">Adicione sua primeira rotina abaixo!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <Card key={task.id} className="p-3 bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`p-1 rounded-full transition-colors ${
                      task.completed 
                        ? 'text-green-500 hover:text-green-600' 
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                    }`}
                  >
                    <CheckCircle2 className="w-5 h-5" />
                  </button>
                  <div className="flex-1">
                    <p className={`text-sm ${
                      task.completed 
                        ? 'line-through text-slate-500 dark:text-slate-400' 
                        : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {task.text}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={task.completed ? "secondary" : "default"} className="text-xs">
                        {task.completed ? 'Concluída' : 'Pendente'}
                      </Badge>
                      <span className="text-xs text-slate-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen transition-all duration-500">
      {/* Theme Toggle Button */}
      <ThemeToggleButton />

      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
        </div>
      </div>

      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen p-4">
        <div className="w-full px-[1vw] py-[1vh]">
          {/* Header */}
          <div className="text-center mb-8 pt-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Gerenciador de Rotinas
            </h1>

          </div>

          {/* View Mode Toggle */}
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

          {/* Tasks Display */}
          <Card className="mb-6 backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border-white/20 dark:border-slate-700/50 shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-slate-800 dark:text-slate-200">
                <List className="w-5 h-5" />
                <span>Suas Rotinas</span>
                <Badge variant="secondary" className="ml-auto">
                  {tasks.length} {tasks.length === 1 ? 'tarefa' : 'tarefas'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderTasks()}
            </CardContent>
          </Card>

          {/* Input Form */}
          <Card className="backdrop-blur-xl bg-white/80 dark:bg-slate-800/80 border-white/20 dark:border-slate-700/50 shadow-2xl">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="flex space-x-3">
                <div className="flex-1 relative">
                  <Plus className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Descreva sua nova rotina..."
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
        </div>
      </div>
    </div>
  )
}

export default Home