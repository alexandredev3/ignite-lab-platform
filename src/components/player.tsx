import { useEffect, useId, useRef, useState } from 'react';
import { DefaultUi, Player as VimePlayer, Youtube } from "@vime/react";
import { useNavigate } from 'react-router-dom';
import { toast, ToastItem } from "react-toastify";
import { Switch } from '@headlessui/react';

import { useGetLessonsLazyQuery } from '../graphql/generated';

import "@vime/core/themes/default.css";

interface PlayerProps {
  videoId: string;
  lessonId: string;
}

const LOCAL_STORAGE_AUTOPLAY_KEY = "ignite-lab-player/autoplay";

export function Player({ videoId, lessonId }: PlayerProps) {
  const player = useRef<HTMLVmPlayerElement>(null);
  const [getLessons] = useGetLessonsLazyQuery();
  const navigate = useNavigate();
  const nextLessonToastId = useId();

  const [autoPlayEnabled, setAutoPlayEnabled] = useState(() => {
    const autoplayEnabled = localStorage.getItem(LOCAL_STORAGE_AUTOPLAY_KEY);

    if (!autoplayEnabled) {
      return false;
    }

    return JSON.parse(autoplayEnabled);
  });

  async function handleToggleAutoPlay() {
    if (!autoPlayEnabled) {
      const canAutoPlay = await player.current?.canAutoplay();

      if (!canAutoPlay) {
        toast.error('Não foi possível ativar o autoplay');

        return;
      }
    }

    player.current!.autoplay = !autoPlayEnabled
    setAutoPlayEnabled(!autoPlayEnabled);

    localStorage.setItem(LOCAL_STORAGE_AUTOPLAY_KEY, JSON.stringify(!autoPlayEnabled));
  }

  const onEnded = async () => {
    if (autoPlayEnabled) {
      const { data } = await getLessons();

      const currentLessonIndex = data?.lessons.findIndex((lesson) => lesson.id === lessonId);
      const nextLesson = data?.lessons[currentLessonIndex! + 1];

      if (nextLesson) {
        toast.info(
          "Pulando para a próxima aula em 3 segundos. Clique para cancelar.",
          {
            toastId: nextLessonToastId,
            data: nextLesson,
            onClick: () => {
              toast.update(nextLessonToastId, {
                data: {
                  skip: false
                }
              });
            },
          },
        );
      }
    }
  };

  useEffect(() => {
    const unsubscribe = toast.onChange(async (payload: ToastItem<any>) => {
      const { id, status, data } = payload;

      if (id === nextLessonToastId && status === 'removed' && data?.slug) {
        const { slug } = data;

        navigate(`/event/lesson/${slug}`);
      }
    });

    return () => unsubscribe();
  }, [nextLessonToastId]);

  return (
    <>
      <div className="flex justify-center bg-black">
        <div className="w-full h-full max-w-[1100px] max-h-[60vh] aspect-video">
          <VimePlayer
            ref={player}
            autoplay={autoPlayEnabled}
            onVmPlaybackEnded={onEnded}
          >
            <Youtube videoId={videoId} />
            <DefaultUi />
          </VimePlayer>
        </div>
      </div>
      <div className='flex justify-end mr-4 mt-4'>
        <Switch.Group>
          <div className='flex items-center'>
            <Switch.Label className="mr-4 text-lg">Autoplay</Switch.Label>
            <Switch
              name="autoplay"
              checked={autoPlayEnabled}
              onChange={handleToggleAutoPlay}
              className={`${autoPlayEnabled ? 'bg-green-500' : 'bg-gray-600'}
                relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
            >
              <span className="sr-only">Autoplay</span>
              <span
                aria-hidden="true"
                className={`${autoPlayEnabled ? 'translate-x-9' : 'translate-x-0'}
                  pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
              />
            </Switch>
          </div>
        </Switch.Group>
      </div>
    </>
  );
}
