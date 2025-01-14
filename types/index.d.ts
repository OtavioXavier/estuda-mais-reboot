export type Resumo = {
    id: string,
    titulo: string,
    texto: string,
    link: string,
    site: string
}

export type Questao = {
    id: string,
    numero: number,
    titulo: string,
    resposta: string,
    alternativas: string[]
}

export type SQ = {
    resumos: Resumo[],
    questoes: Questao[]
}

