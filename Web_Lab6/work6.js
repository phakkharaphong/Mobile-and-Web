const RB=ReactBootstrap;
const {Alert, Card, Button, Table} = ReactBootstrap;


class App extends React.Component {
    title = (
      <Alert variant="info">
        <b>Work6 :</b> Firebase
      </Alert>
    );
    footer = (
      <div>
        By 643020632-1 Phakkharaphong Charoenphon <br />
        College of Computing, Khon Kaen University
      </div>
    );
    
    state = {
        scene: 0,
        students:[],
        stdid:"",
        stdtitle:"",
        stdfname:"",
        stdlname:"",
        stdemail:"",
        stdphone:"",

    }  
   
    render() {
        // var stext = JSON.stringify(this.state.students);  
        return (
            <Card>
              <Card.Header>{this.title}</Card.Header>  
              <Card.Body>
                <Button onClick={()=>this.readData()}>Read Data</Button>
                <Button onClick={()=>this.autoRead()}>Auto Read</Button>
                <div>
                <StudentTable data={this.state.students} app={this}/>  
                </div>
              </Card.Body>
              <Card.Footer>
              <b>เพิ่ม/แก้ไขข้อมูล นักศึกษา :</b><br/>
              <TextInput label="ID" app={this} value="stdid" style={{width:120}}/>  
              <TextInput label="คำนำหน้า" app={this} value="stdtitle" style={{width:100}} />
              <TextInput label="ชื่อ" app={this} value="stdfname" style={{width:120}}/>
              <TextInput label="สกุล" app={this} value="stdlname" style={{width:120}}/>
              <TextInput label="Email" app={this} value="stdemail" style={{width:150}} />        
              <TextInput label="Phone" app={this} value="stdphone" style={{width:120}}/>
              <Button onClick={()=>this.insertData()}>Save</Button>
              </Card.Footer>
              <Card.Footer>{this.footer}</Card.Footer>
            </Card>          
          );
    
      }  
      
      //อ่านข้อมูลในData
      readData(){
        db.collection("students").get().then((querySnapshot) => {
            var stdlist=[];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id,... doc.data()});                
            });
            console.log(stdlist);
            this.setState({students: stdlist});
        });
    }

    //อ่านอัตโนมัติ

    autoRead(){
        db.collection("students").onSnapshot((querySnapshot) => {
            var stdlist=[];
            querySnapshot.forEach((doc) => {
                stdlist.push({id:doc.id,... doc.data()});                
            });          
            this.setState({students: stdlist});
        });
    }

    //][]
    delete(std){
        if(confirm("ต้องการลบข้อมูล")){
           db.collection("students").doc(std.id).delete();
        }
    }

    //เพิ่มข้อมูล
    insertData(){
        db.collection("students").doc(this.state.stdid).set({
           title : this.state.stdtitle,
           fname : this.state.stdfname,
           lname : this.state.stdlname,
           phone : this.state.stdphone,
           email : this.state.stdemail,
        });
    }

    //แก้ไข
    edit(std){      
        this.setState({
         stdid    : std.id,
         stdtitle : std.title,
         stdfname : std.fname,
         stdlname : std.lname,
         stdemail : std.email,
         stdphone : std.phone,
        })
     }
  }
  //ปุ่มแก้ไข
  function EditButton({std,app}){
    return <button onClick={()=>app.edit(std)}>แก้ไข</button>
   }
 
  //แสดงรายชื่อในDta
   function StudentTable({data, app}){
    return <table className='table'>
    <tr>
        <td>รหัส</td>
        <td>คำนำหน้า</td>
        <td>ชื่อ</td>
        <td>สกุล</td>
        <td>email</td>
        </tr>
        {
          data.map((s)=><tr>
          <td>{s.id}</td>
          <td>{s.title}</td>
          <td>{s.fname}</td>
          <td>{s.lname}</td>
          <td>{s.email}</td>
          <td><EditButton std={s} app={app}/></td>
          <td><DeleteButton std={s} app={app}/></td>        
          </tr> )
        }
    </table>
  }

  //Inputtext
  function TextInput({label,app,value,style}){
    return <label className="form-label">
    {label}:    
     <input className="form-control" style={style}
     value={app.state[value]} onChange={(ev)=>{
         var s={};
         s[value]=ev.target.value;
         app.setState(s)}
     }></input>
   </label>;  
  }

  function DeleteButton({std,app}){    
    return <button onClick={()=>app.delete(std)}>ลบ</button>
  }


 // db.collection("students").get().then((querySnapshot) => {
//   querySnapshot.forEach((doc) => {
//       console.log(`${doc.id} =>`,doc.data());
//   });
// });

  // ใช้ config จาก เว็บ Firebase: Project Setting 
  const firebaseConfig = {
    apiKey: "AIzaSyBkKCHUMTAKbdLacIr1KazkSKV0D3Mtv-M",
    authDomain: "web2566-29ed6.firebaseapp.com",
    projectId: "web2566-29ed6",
    storageBucket: "web2566-29ed6.appspot.com",
    messagingSenderId: "986708417952",
    appId: "1:986708417952:web:a4b30931b35dee89e458c5",
    measurementId: "G-S73JGPNMBS"
  };
firebase.initializeApp(firebaseConfig);      
const db = firebase.firestore();
db.collection("students").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
      console.log(`${doc.id} =>`,doc.data());
  });
});



  const container = document.getElementById("myapp");
  const root = ReactDOM.createRoot(container);
  root.render(<App />);
