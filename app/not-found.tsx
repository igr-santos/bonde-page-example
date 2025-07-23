
export default function NotFound() {
    return (
        <div className="container mx-auto">
            <div className="w-1/2 p-10">
                <h1 className="text-3xl font-bold">Ops</h1>
                <p className="text-gray-500 mt-2">Desculpa, mas não conseguimos encontrar a página que você procura. Confira se o link está certo e tente carregar a página novamente.</p>
                <p className="text-gray-500 mt-2">Se o erro persistir, envie um email para <a className="text-pink-600 underline" href="mailto:suporte@bonde.org">suporte@bonde.org</a> com link da página que você está tentando acessar.</p>
                <p className="text-gray-500 mt-2">Te responderemos o quanto antes :)</p>
            </div>
        </div>
    );
}