import { useParams } from "react-router-dom";
import {
  CaretRight,
  DiscordLogo,
  FileArrowDown,
  Lightning,
} from "phosphor-react";

import { useGetLessonBySlugQuery } from "../graphql/generated";

import { LessonsSidebar } from "../components/lessons-sidebar";
import { Player } from "../components/player";

type Params = {
  slug: string;
};

export function Lesson() {
  const { slug } = useParams<Params>();

  const { data, loading, error } = useGetLessonBySlugQuery({
    variables: {
      slug,
    },
  });

  if (loading) {
    return (
      <div className="flex-1">
        <h4>Loading...</h4>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1">
        {!error && (
          <Player videoId={data?.lesson?.videoId!} lessonId={data?.lesson?.id!} />
        )}

        <div className="p-8 max-w-[1100px] mx-auto">
          <section className="md:flex-row flex-col flex items-start gap-16">
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{data?.lesson?.title}</h1>
              <p className="mt-4 text-gray-200 leading-relaxed">
                {data?.lesson?.description}
              </p>

              {data?.lesson?.teacher && (
                <div className="flex items-center gap-4 mt-6">
                  <img
                    className="w-16 h-16 rounded-full border-2 border-blue-500"
                    src={data?.lesson.teacher.avatarURL}
                    alt={data?.lesson.teacher.name}
                  />

                  <div className="leading-relaxed">
                    <strong className="block font-bold text-2xl">
                      {data?.lesson.teacher.name}
                    </strong>
                    <span className="block text-gray-200 text-sm">
                      {data?.lesson.teacher.bio}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="md:w-[312px] w-full flex flex-col gap-4">
              <a
                href=""
                className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors"
              >
                <DiscordLogo size={24} />
                comunidade do discord
              </a>

              <a
                href=""
                className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors"
              >
                <Lightning size={24} />
                acesse o desafio
              </a>
            </div>
          </section>

          <section className="gap-8 mt-20 grid md:grid-cols-2 grid-cols-1">
            {/** with `overflow-hidden` we won't have to apply the `rounded` style in all children elements. */}
            <a
              className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
              href=""
            >
              <div className="bg-green-700 h-full p-6 flex items-center">
                <FileArrowDown size={40} />
              </div>
              <div className="py-6 leading-relaxed">
                <strong className="text-2xl">Material complementar</strong>
                <p className="text-sm text-gray-200 mt-2">
                  Acesse o material complementar para acelerar o seu
                  desenvolvimento
                </p>
              </div>
              <div className="h-full p-6 flex items-center">
                <CaretRight size={24} />
              </div>
            </a>
            <a
              className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors"
              href=""
            >
              <div className="bg-green-700 h-full p-6 flex items-center">
                <FileArrowDown size={40} />
              </div>
              <div className="py-6 leading-relaxed">
                <strong className="text-2xl">Wallpapers exclusivos</strong>
                <p className="text-sm text-gray-200 mt-2">
                  Baixe wallpapers exclusivos da Maratona Explorer e personalize a
                  sua máquina
                </p>
              </div>
              <div className="h-full p-6 flex items-center">
                <CaretRight size={24} />
              </div>
            </a>
          </section>
        </div>
      </div>
      <LessonsSidebar />
    </>
  );
}
