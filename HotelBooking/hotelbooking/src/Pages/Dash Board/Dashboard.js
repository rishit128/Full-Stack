import "./dashboard.scss";
import Widget from "../../components/widget/Widget";
const Dashboard = () => {
  return (
    <div className="home">
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="hotels" />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
