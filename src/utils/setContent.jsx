import Loader from "../components/UI/Loader/Loader";

const setContent = (ComponentView, data, process) => {
  switch (process) {
    case true:
        return <Loader/>
    case false:
        return <ComponentView data={data}/>;
    default: 
        throw new Error('Unexpected process state');
  }
}

export default setContent;