import React from 'react';
import { BlockUI } from 'ns-react-block-ui';

interface BlockUITemplateProps {
  blocking: boolean;
  message: string;
  mode: "full-screen" | "contain" | "stretch" | undefined;
  children: React.ReactNode;
}

const BlockUITemplate: React.FC<BlockUITemplateProps> = ({ blocking, message, mode, children }) => {
  return (
    <BlockUI
      blocking={blocking}
      message={message}
      loader="default"
      mode={mode}
      cursor="progress"
      overlayStyle={{
        opacity: 0.35,
        background: '#9e9e9eeb',
        borderRadius: '1rem'
      }}
    >
      {children}
    </BlockUI>
  );
};

export default BlockUITemplate;

// Ejemplo de uso:
// <BlockUITemplate blocking={true} message="Cargando...">
//   <div>Contenido aquí</div>
// </BlockUITemplate>
