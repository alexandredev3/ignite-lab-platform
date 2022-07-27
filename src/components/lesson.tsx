import { Link, useParams } from "react-router-dom";
import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import classnames from "classnames";
import { useNavigate } from 'react-router-dom';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "class" | "live";
}

type Params = {
  slug: string;
};

export function Lesson({ title, slug, type, availableAt }: LessonProps) {
  const { slug: currentLessonSlug } = useParams<Params>();
  const navigate = useNavigate();

  const isActiveLesson = currentLessonSlug === slug;

  const isAvailable = isPast(availableAt);
  const availableDateFormatted = format(
    availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    {
      locale: ptBR,
    }
  );

  function handleSelectLesson() {
    if (!isAvailable) {
      return;
    }

    navigate(`/event/lesson/${slug}`);
  }

  return (
    <button onClick={handleSelectLesson} disabled={!isAvailable} className="group text-left disabled:opacity-50 disabled:cursor-not-allowed">
      <span className="block text-gray-300 first-letter:capitalize hover">
        {availableDateFormatted}
      </span>

      <div
        className={classnames(
          "rounded border border-gray-500 p-4 mt-2 relative",
          {
            "bg-green-500": isActiveLesson,
            "group-hover:border-green-500": !isActiveLesson && isAvailable,
          }
        )}
      >
        {isActiveLesson && (
          <span className="w-4 h-4 before:w-4 before:h-4 absolute -left-2 bottom-0 top-[50%] -translate-y-[50%] -z-1 rounded-sm rotate-45 bg-green-500" />
        )}

        <header className="flex items-center justify-between">
          {isAvailable ? (
            <span
              className={classnames(
                "flex items-center gap-2 text-sm font-medium",
                {
                  "text-white": isActiveLesson,
                  "text-blue-500": !isActiveLesson,
                }
              )}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="flex items-center gap-2 text-sm text-orange-500 font-medium">
              <Lock size={20} />
              Em breve
            </span>
          )}

          <span
            className={classnames(
              "text-xs rounded py-[0.125rem] px-2 tex-white border border-green-300 font-bold",
              {
                "border-white": isActiveLesson,
                "border-green-300": !isActiveLesson,
              }
            )}
          >
            {type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>

        <strong
          className={classnames("block mt-5", {
            "text-white": isActiveLesson,
            "text-gray-200": !isActiveLesson,
          })}
        >
          {title}
        </strong>
      </div>
    </button>
  );
}
