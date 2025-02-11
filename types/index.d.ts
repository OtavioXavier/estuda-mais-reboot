export type Resumo = {
    id: string,
    titulo: string,
    texto: string,
    link: string,
    fonte: string
}

export type Questao = {
    id: string,
    pergunta: string,
    resposta: string,
    alternativas: string[]
}

export type SQ = {
    resumos: Resumo[],
    questoes: Questao[]
}

export interface IMessageInput {
    assunto: string;
    site: string;
}

