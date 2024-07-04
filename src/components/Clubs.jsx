import { useState, useEffect } from "react";

export default function BuscarClube() {
    const [clubes, setClubes] = useState([]);
    const [erro, setErro] = useState(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`https://api.cartola.globo.com/clubes`);
            const data = await response.json();
            const clubesList = Object.values(data);
            setClubes(clubesList);
        } catch (error) {
            setErro(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="ListaClubes">
            {erro && <p>Ocorreu um erro: {erro.message}</p>}
            <ul className="clubesAlinhamento">
            {clubes.slice(1).map((clube) => (
                    <li key={clube.id} style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src={clube.escudos['60x60']}
                            alt={`${clube.nome} logo`}

                        />
                        <div className="Clubtxt">
                            <p className="NomeClub">{clube.nome}</p>
                            <p className="Apelido">{clube.apelido}</p>
                        </div>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    );
}