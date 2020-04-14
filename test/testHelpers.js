import ReactDOM from 'react-dom';

export const setupContainer = () => {
    const root = document.createElement('div');

    return {
        render: component => ReactDOM.render(component, root),
        root
    };
}