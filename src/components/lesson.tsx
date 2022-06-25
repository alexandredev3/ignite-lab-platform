import { Link } from "react-router-dom";
import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { LessonsType } from "../typings";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: LessonsType;
}

export function Lesson({ title, slug, type, availableAt }: LessonProps) {
  const isAvailable = isPast(availableAt);
  const availableDateFormatted = format(
    availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    {
      locale: ptBR,
    }
  );

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="block text-gray-300 first-letter:capitalize hover">
        {availableDateFormatted}
      </span>

      <div className="rounded border border-gray-500 group-hover:border-green-500 p-4 mt-2">
        <header className="flex items-center justify-between">
          {isAvailable ? (
            <span className="flex items-center gap-2 text-sm text-blue-500 font-medium">
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span className="text-xs rounded py-[0.125rem] px-2 tex-white border border-green-300 font-bold">
            {LessonsType.live === type ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>

        <strong className="block text-gray-200 mt-5">{title}</strong>
      </div>
    </Link>
  );
}
