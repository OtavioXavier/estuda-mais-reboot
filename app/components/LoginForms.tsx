"use client";

import { useState } from "react";
import { crimsonText, josefinSans } from "@/utils/fonts";

export default function LoginForms() {
    const [cadastro, setCadastro] = useState(true);

    function toggleCadastro() {
        setCadastro((prev) => !prev);
    }

    return (
        <>
            {cadastro ? (
                <div className="animate-fade-in-down transition-all delay-500">
                    <header>
                        <h1 className={`${crimsonText.className} text-foreground text-5xl mt-4 font-bold`}>
                            Crie uma nova conta
                        </h1>
                        <p className={`${crimsonText.className} text-foreground text-xl mt-4`}>
                            Já tem uma conta?{" "}
                            <button className="text-main" onClick={toggleCadastro}>
                                clique aqui
                            </button>
                        </p>
                    </header>
                    <div className="mt-8">
                        <form action="" className="flex flex-col items-center gap-6">
                            <input
                                type="text"
                                placeholder="Nome"
                                className={`${josefinSans.className} w-96 h-12 rounded-lg bg-secondaryWhite focus:outline-main p-2`}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                className={`${josefinSans.className} w-96 h-12 rounded-lg bg-secondaryWhite focus:outline-main p-2`}
                            />
                            <input
                                type="password"
                                placeholder="Senha"
                                className={`${josefinSans.className} w-96 h-12 rounded-lg bg-secondaryWhite focus:outline-main p-2`}
                            />
                            <div className="flex items-cente gap-2 w-96">
                                <input type="checkbox" id="termo" className="w-6 h-6" />
                                <p className={`${crimsonText.className} text-foreground`}>Eu aceito os <span className="font-bold text-main">termos de uso</span>.</p>
                    </div>

                    <button
                        type="submit"
                        className={`${josefinSans.className} w-96 h-12 bg-main rounded-lg text-white font-bold text-xl`}
                    >
                        Cadastrar conta
                    </button>
                </form>
          </div >
        </div >
      ) : (
        <div className="animate-fade-in-down transition-all delay-500">
            <header>
                <h1 className={`${crimsonText.className} text-foreground text-5xl mt-4 font-bold`}>
                    Entre na sua conta
                </h1>
                <p className={`${crimsonText.className} text-foreground text-xl mt-4`}>
                    Ainda não tem uma conta?{" "}
                    <button className="text-main" onClick={toggleCadastro}>
                        clique aqui
                    </button>
                </p>
            </header>
            <div className="mt-8">
                <form action="" className="flex flex-col items-center gap-6">
                    <input
                        type="email"
                        placeholder="Email"
                        className={`${josefinSans.className} w-96 h-12 rounded-lg bg-secondaryWhite focus:outline-main p-2`}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className={`${josefinSans.className} w-96 h-12 rounded-lg bg-secondaryWhite focus:outline-main p-2`}
                    />
                    <button
                        type="submit"
                        className={`${josefinSans.className} w-96 h-12 bg-main rounded-lg text-white font-bold text-xl`}
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </div>
    )
}
    </>
  );
}
