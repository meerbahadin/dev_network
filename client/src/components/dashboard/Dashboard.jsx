import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardAction from './DashboardAction';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary  my-2">Dashboard</h1>
      <p className="lead">
        <i className="fa fa-user" aria-hidden="true"></i>
        {' '} Welcome {user && user.name}
      </p>
      {profile !== null ? <Fragment><DashboardAction/></Fragment> : <Fragment>
        <p>You dont have any profile yet! , please set up your profile</p>
        <Link to='/create-profile' className='btn btn-success my-1'>Create Profile</Link>
       
        </Fragment>}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
