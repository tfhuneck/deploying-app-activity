// import { createRoot } from 'react-dom/client';
// import superagent from 'https://cdnjs.cloudflare.com/ajax/libs/superagent/8.0.9/superagent.min.js';

function Data() {

    const  [dataMap, setDataMap] = React.useState([]);
    var dataArr = [];
    var url = '/data';


    React.useEffect(() => {
        const getData = async () => {
            superagent
        .get(url)
        .end(function(err,res){
            if(err){
                console.log(err);
            }
            else{
                console.log(res);
                let data = JSON.stringify(res.body)
                console.log(data)
                dataArr = res.body; 
                setDataMap(dataArr);
                console.log(dataMap);
            }
            })
        }
        getData();
    },[])
    

    return (
        <>
            {dataMap.map((data, key) => {
                return (
                    <div key={key} className="card data">
                        <img src={data.avatar} className="card-img-top"/>
                        <div className="card-body">
                            <h5 className="card-title">{data.name}</h5>
                            <span className="card-text">Username: {data.username}</span> <br/>
                            <span className="card-text">Password: {data.password}</span> <br/>
                            <span className="card-text">Date of Birth: {data.dob}</span> <br/>
                            <span className="card-text">Phone Number: {data.phone}</span> <br/> <br/>
                            <h6> Address</h6>
                            <span className="card-text">{data.streetaddress}</span> <br/>
                            <span className="card-text">{data.city}</span> <br/>
                            <span className="card-text">{data.state}, {data.zip} </span> <br/>
                            <span className="card-text"></span>
                        </div>
                    </div>
                )

                })
            }
        </>
    )
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<Data/>);

// ReactDOM.render(<Data/>, document.querySelector('#app'))