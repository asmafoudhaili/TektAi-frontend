import React from 'react';
import NioButton from '../../NioButton/NioButton';
import NioPricingCard from './NioPricingCard';

function MyComponent() {
  return (
    <div>
      <NioPricingCard
        title="Plan Standard"
        subtitle="Pour les utilisateurs individuels"
        price="9.99"
        priceType="mois"
        variant="one"
        active={true}
      >
        <NioPricingCard.Body>
          {/* Ajouter le bouton à l'intérieur du corps de la carte */}
          <NioButton label="Choisir le plan" />
        </NioPricingCard.Body>
      </NioPricingCard>

      <NioPricingCard
        title="Plan Premium"
        subtitle="Pour les entreprises"
        price="19.99"
        priceType="mois"
        variant="two"
        active={false}
      >
        <NioPricingCard.Body>
          <NioButton label="Choisir le plan" />
        </NioPricingCard.Body>
      </NioPricingCard>

      <NioPricingCard
        title="Plan Entreprise"
        subtitle="Pour les grandes entreprises"
        price="49.99"
        priceType="mois"
        variant="three"
        active={false}
      >
        <NioPricingCard.Body>
          <NioButton label="Choisir le plan" />
        </NioPricingCard.Body>
      </NioPricingCard>
    </div>
  );
}

export default MyComponent;
