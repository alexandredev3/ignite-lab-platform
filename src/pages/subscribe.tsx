import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import classnames from "classnames";

import { useCreateSubscriberMutation } from "../graphql/generated";

import { Logo } from "../components/logo";

type FormValues = {
  name: string;
  email: string;
};

export function Subscribe() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [createSubscriber] = useCreateSubscriberMutation();

  async function onSubmit(values: FormValues) {
    try {
      await createSubscriber({
        variables: values,
      });

      navigate(`/event`);
    } catch (err: any) {
      console.error(err);
      // TODO: handle this error decently.
      alert("Something went wrong. Try again later...");
    }
  }

  return (
    <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
      <div className="mx-auto bg-top bg-react-icon bg-no-repeat">
        <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
          <div className="max-w-[640px]">
            <Logo />

            <h1 className="mt-8 text-[2.5rem] leading-tight">
              Construa uma{" "}
              <strong className="text-blue-500">aplicação completa</strong>, do
              zero, com <strong className="text-blue-500">React</strong>
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              Em apenas uma semana você vai dominar na prática uma das
              tecnologias mais utilizadas e com alta demanda para acessar as
              melhores oportunidades do mercado.
            </p>
          </div>

          <div className="p-8 bg-gray-700 border border-gray-500 rounded">
            <strong className="block text-2xl mb-6">
              Inscreva-se gratuitamente
            </strong>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-2"
            >
              <input
                className={classnames(
                  "bg-gray-900 rounded px-5 h-14 focus:outline-none border",
                  {
                    "border-transparent focus:border-green-300 hover:border-green-300 transition-colors":
                      !errors.name,
                    "border-red-500": errors.name,
                  }
                )}
                type="text"
                placeholder="Seu nome completo"
                {...register("name", { required: true })}
              />
              <input
                className={classnames(
                  "bg-gray-900 rounded px-5 h-14 focus:outline-none border",
                  {
                    "border-transparent focus:border-green-300 hover:border-green-300 transition-colors":
                      !errors.email,
                    "border-red-500": errors.email,
                  }
                )}
                type="text"
                placeholder="Digite seu e-mail"
                {...register("email", {
                  required: true,
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Garantir minha vaga
              </button>
            </form>
          </div>
        </div>

        <img
          src="/src/assets/images/subscribe.png"
          alt="subscribe image"
          className="mt-10"
        />
      </div>
    </div>
  );
}
