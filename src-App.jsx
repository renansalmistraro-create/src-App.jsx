import React, { useState } from "react";
import { motion } from "framer-motion";

// Single-file React app (paste into a Vite + React + Tailwind project)
// Tailwind is used for styling. No external UI libraries required so it's easy to run.

const SAMPLE_LESSONS = [
  {
    id: "l1",
    title: "Silabação e Divisão Silábica",
    level: "EF1",
    overview:
      "Conceitos de sílaba, encontros consonantais e exercícios práticos com feedback imediato.",
    exercises: [
      {
        id: "e1",
        type: "fill",
        prompt: "Separe em sílabas: ‘cidade’",
        answer: "ci-da-de",
      },
      {
        id: "e2",
        type: "mcq",
        prompt: "Qual é a sílaba tônica de ‘amigo’?",
        options: ["a-", "mi-", "go-"],
        answer: "mi-",
      },
    ],
  },
  {
    id: "l2",
    title: "Ortografia: Uso de R e RR",
    level: "EF2",
    overview: "Regras básicas e prática de ditado com autocorreção.",
    exercises: [
      {
        id: "e3",
        type: "mcq",
        prompt: "Como se escreve: carro / caro? Escolha a forma correta para o veículo.",
        options: ["caro", "carro"],
        answer: "carro",
      },
    ],
  },
];

function Header({ onNavigate, active }) {
  return (
    <header className="bg-indigo-700 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold">Portal Português — Educação Básica</h1>
        <nav className="space-x-4">
          <button
            className={`px-3 py-2 rounded ${active === "home" ? "bg-indigo-900" : "hover:bg-indigo-600"}`}
            onClick={() => onNavigate("home")}
          >
            Início
          </button>
          <button
            className={`px-3 py-2 rounded ${active === "lessons" ? "bg-indigo-900" : "hover:bg-indigo-600"}`}
            onClick={() => onNavigate("lessons")}
          >
            Aulas
          </button>
          <button
            className={`px-3 py-2 rounded ${active === "exercises" ? "bg-indigo-900" : "hover:bg-indigo-600"}`}
            onClick={() => onNavigate("exercises")}
          >
            Exercícios
          </button>
          <button
            className={`px-3 py-2 rounded ${active === "about" ? "bg-indigo-900" : "hover:bg-indigo-600"}`}
            onClick={() => onNavigate("about")}
          >
            Sobre
          </button>
        </nav>
      </div>
    </header>
  );
}

function Home({ onNavigate }) {
  return (
    <main className="container mx-auto p-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <section className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Bem-vindo ao Portal de Português</h2>
            <p className="mb-4">Conteúdos alinhados à BNCC e focados em aprendizagem ativa.</p>
            <ul className="list-disc ml-6 mb-4">
              <li>Aulas curtas e objetivas</li>
              <li>Exercícios com feedback automático</li>
              <li>Relatórios básicos de progresso</li>
            </ul>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded" onClick={() => onNavigate("lessons")}>Ver aulas</button>
              <button className="px-4 py-2 border rounded" onClick={() => onNavigate("exercises")}>Ir para exercícios</button>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-medium mb-2">Progresso do aluno (exemplo)</h3>
            <ProgressCard name="Aluno Exemplo" completed={2} total={5} />
          </div>
        </section>
      </motion.div>
    </main>
  );
}

function ProgressCard({ name, completed, total }) {
  const pct = Math.round((completed / total) * 100);
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className="text-sm text-gray-600">{name}</div>
          <div className="font-bold">{completed}/{total} atividades</div>
        </div>
        <div className="text-sm text-gray-600">{pct}%</div>
      </div>
      <div className="h-3 bg-gray-200 rounded overflow-hidden">
        <div className="h-full bg-indigo-600" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function Lessons({ onOpenLesson }) {
  return (
    <main className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Aulas</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {SAMPLE_LESSONS.map((l) => (
          <article key={l.id} className="p-4 border rounded bg-white shadow-sm">
            <h3 className="font-bold">{l.title}</h3>
            <p className="text-sm text-gray-600">Nível: {l.level}</p>
            <p className="mt-2 text-gray-700">{l.overview}</p>
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={() => onOpenLesson(l.id)}>Abrir</button>
              <button className="px-3 py-2 border rounded" onClick={() => alert('Baixar PDF — funcionalidade a integrar')}>Baixar PDF</button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

function LessonViewer({ lessonId, onBack }) {
  const lesson = SAMPLE_LESSONS.find((s) => s.id === lessonId);
  const [currentEx, setCurrentEx] = useState(0);
  if (!lesson) return <div className="p-6">Aula não encontrada</div>;

  return (
    <main className="container mx-auto p-6">
      <button className="mb-4 text-sm text-indigo-600" onClick={onBack}>← Voltar</button>
      <h2 className="text-2xl font-bold">{lesson.title}</h2>
      <p className="text-gray-700 mt-2">{lesson.overview}</p>

      <section className="mt-6">
        <h3 className="font-semibold mb-2">Exercícios</h3>
        {lesson.exercises.map((ex, idx) => (
          <div key={ex.id} className={`p-4 mb-3 border rounded ${currentEx === idx ? 'bg-indigo-50' : 'bg-white'}`}>
            <strong>{idx + 1}. </strong>{ex.prompt}
            <ExerciseRenderer exercise={ex} />
            <div className="mt-2 text-xs text-gray-500">{currentEx === idx ? 'Aula em foco' : ''}</div>
          </div>
        ))}
      </section>
    </main>
  );
}

function ExerciseRenderer({ exercise }) {
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);

  function check() {
    let ok = false;
    if (exercise.type === "fill") {
      ok = normalize(answer) === normalize(exercise.answer);
    } else if (exercise.type === "mcq") {
      ok = answer === exercise.answer;
    }
    setFeedback(ok ? { ok: true, text: "Correto!" } : { ok: false, text: "Tente novamente." });
  }

  return (
    <div className="mt-3">
      {exercise.type === "fill" && (
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Escreva sua resposta aqui"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            aria-label={exercise.prompt}
          />
          <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={check}>Verificar</button>
        </div>
      )}

      {exercise.type === "mcq" && (
        <div className="flex flex-col gap-2 mt-2">
          {exercise.options.map((opt) => (
            <label key={opt} className="inline-flex items-center gap-2">
              <input
                type="radio"
                name={exercise.id}
                value={opt}
                checked={answer === opt}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <span>{opt}</span>
            </label>
          ))}
          <div className="mt-2">
            <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={check}>Verificar</button>
          </div>
        </div>
      )}

      {feedback && (
        <div className={`mt-2 p-2 rounded ${feedback.ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{feedback.text}</div>
      )}

      {exercise.hint && <div className="mt-2 text-sm text-gray-500">Dica: {exercise.hint}</div>}
    </div>
  );
}

function normalize(s) {
  return (s || "").toLowerCase().replace(/\s+/g, " ").trim();
}

function ExercisesOverview() {
  const all = SAMPLE_LESSONS.flatMap((l) => l.exercises.map((e) => ({ ...e, lessonTitle: l.title })));
  return (
    <main className="container mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Exercícios rápidos</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {all.map((ex) => (
          <div key={ex.id} className="p-4 border rounded bg-white">
            <div className="text-sm text-gray-600">{ex.lessonTitle}</div>
            <div className="mt-2">{ex.prompt}</div>
            <ExerciseRenderer exercise={ex} />
          </div>
        ))}
      </div>
    </main>
  );
}

function About() {
  return (
    <main className="container mx-auto p-6">
      <h2 className="text-xl font-semibold">Sobre o projeto</h2>
      <p className="mt-2 text-gray-700">Este protótipo foi pensado para professores e alunos do ensino fundamental. Algumas ideias para evoluir:</p>
      <ul className="list-disc ml-6 mt-2 text-gray-700">
        <li>Integração com backend (Node / Firebase) para armazenar progresso</li>
        <li>Gerador automático de PDFs com as aulas</li>
        <li>Módulo de áudio para ditados e leitura acompanhada</li>
        <li>Painel do professor para criar e editar aulas</li>
      </ul>
    </main>
  );
}

export default function App() {
  const [route, setRoute] = useState("home");
  const [openLesson, setOpenLesson] = useState(null);

  function navigate(r) {
    setOpenLesson(null);
    setRoute(r);
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <Header onNavigate={navigate} active={route} />
      {route === "home" && <Home onNavigate={navigate} />}
      {route === "lessons" && !openLesson && <Lessons onOpenLesson={(id) => { setOpenLesson(id); setRoute('lessons'); }} />}
      {openLesson && <LessonViewer lessonId={openLesson} onBack={() => setOpenLesson(null)} />}
      {route === "exercises" && <ExercisesOverview />}
      {route === "about" && <About />}

      <footer className="bg-white border-t mt-8">
        <div className="container mx-auto p-4 text-sm text-gray-600">© {new Date().getFullYear()} Portal Português — Protótipo</div>
      </footer>
    </div>
  );
}

