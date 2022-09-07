declare module '*.svg' {
    const ReactComponent: React.FC<React.SVGAttributes<SVGElement>>;
    const content: string;

    export { ReactComponent };
    export default content;
}

declare module 'universal-emoji-parser'