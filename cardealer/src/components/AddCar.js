import { useState } from 'react';

const AddCar = props => {

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [price, setPrice] = useState();
    const [isUsed, setIsUsed] = useState('false');
    const [description, setDescription] = useState('')
    const [forRent, setForRent] = useState(false);
    const [forSale, setForSale] = useState(false);

    const submitHandler = (event) => {
        event.preventDefault();
        props.addToCars(name, description, image, price, isUsed, forRent, forSale);
        setName('');
        setImage('');
        setPrice('');
        setDescription('');
    }
    const convertToBool = (text)=>{
        if(text === 'true'){
          return true
        }else if(text === 'false'){
          return false;
        }
      }

    return (

        <section id = "0" className=" pt-120 pb-120">
            <div className="container">
                <div className="section-header text-center">
                    <h2 className="section-title">Add Car</h2>
                    {/* <p> Look through our equisite selection of cars and get one that fits your choice</p> */}
                </div>
                <form className="reservation-form" onSubmit = {submitHandler}>
                    <div className="content-block">
                    </div>
                    <div className="content-block">
                        <div className="row">
                            <div className="col-lg-6 form-group">
                                <input type="text" placeholder="Name" required value = {name} onChange = {(e)=>setName(e.target.value)}/>
                            </div>
                            <div className="col-lg-6 form-group">
                                <input type="text" placeholder="Image URL" required value = {image} onChange = {(e)=>setImage(e.target.value)}/>
                            </div>
                            <div className="col-lg-6 form-group">
                                <input type="number" placeholder="Price" required value = {price} onChange = {(e)=>setPrice(e.target.value)} />
                            </div>
                            <div className="col-lg-6 form-group">
                                <select onChange = {(e)=>{
                                    setForRent(convertToBool(e.target.value))
                                    setForSale(!convertToBool(e.target.value))
                                    }}>
                                    <option>For Rent</option>
                                    <option value = "true">True</option>
                                    <option value = "false">False</option>
                                </select>
                            </div>
                            <div className="col-lg-6 form-group">
                                <select onChange = {(e)=>setIsUsed(convertToBool(e.target.value))}>
                                    <option>is Used</option>
                                    <option value = "true">True</option>
                                    <option value = "false">False</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="content-block">
                        <div className="row">
                            <div className="col-lg-12 form-group">
                                <textarea value = {description} placeholder="Car Description" onChange = {(e)=>setDescription(e.target.value)} />
                            </div>
                            <div className="col-lg-12">
                                <button type="submit" className="cmn-btn">Add your Car</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>

    );
}

export default AddCar;