import React from 'react';
import { getBackground } from "../../constants/pokemon.types";
import { numberFormation } from "../../services/common.service";
import "./pokemonCard.scss";

interface PokemonCardProps {
    data: any;
    onClick?: () => void;
    className?: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ data, onClick, className = "" }) => {
    return (
        <>
            <div className={`${className} card`} onClick={onClick} role="presentation" style={{
                background: getBackground(data?.types)
            }}>
                <div className="image-container">
                    <img src={data?.sprites?.other?.dream_world?.front_default ||
                        data?.sprites?.front_default || `${process.env.PUBLIC_URL || ''}/favicon.ico`} alt="Avatar" />
                </div>
                <div className="text-container">
                    <strong><b>{data?.name ?? ''}</b></strong>
                    <span>{data?.id ? numberFormation(data.id) : ''}</span>
                </div>
            </div>
        </>
    );
};

export default PokemonCard;