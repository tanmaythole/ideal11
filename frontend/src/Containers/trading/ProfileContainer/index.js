import React, { useEffect, useState } from 'react'
import SecondaryHeader from '../../../Components/AppHeader/SecondaryHeader';
import TabFooter from '../../../Components/TabFooter';
import coverImg from '../../../assets/images/coverImg.jpg';
import user from '../../../assets/images/user.png';
import style from './style.module.css';
import ProfilePart from '../../../Components/Profile/ProfilePart';
import StatCard from '../../../Components/Profile/StatCard';
import { FaChartLine, FaListAlt } from 'react-icons/fa';
import InfoBlock from '../../../Components/Profile/InfoBlock';
import Row from '../../../Components/Styles/Row';
import axiosInstance from '../../../axios';

const ProfileContainer = () => {
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        axiosInstance
            .get('/auth/profile')
            .then(res => {
                setUserData(res.data.data);
                setLoading(false);
            })
            .catch(err=> {
                console.log(err.response);
            })
    }, [])
    
    return (
        <>
            <SecondaryHeader>My profile</SecondaryHeader>
            {loading?(
                <></>
            ):(
                <div className={style.container}>
                    <img
                        src={coverImg}
                        className={style.coverImg} 
                    />
                    <div className={style.userImg}>
                        <img 
                            src={user}
                            className={style.profileImg}
                        />
                        <h2>{userData.first_name} {userData.last_name}</h2>
                    </div>

                    <ProfilePart title='Experience'>
                        <Row>
                            <StatCard>
                                <StatCard.Icon>
                                    <FaListAlt
                                        size={35}
                                    />
                                </StatCard.Icon>
                                <StatCard.Content>
                                    <h3>2</h3>
                                    <div>Matches Played</div>
                                </StatCard.Content>
                            </StatCard>
                            <StatCard>
                                <StatCard.Icon>
                                    <FaChartLine 
                                        size={35}
                                    />
                                </StatCard.Icon>
                                <StatCard.Content>
                                    <h3>0</h3>
                                    <div>Winnings</div>
                                </StatCard.Content>
                            </StatCard>
                        </Row>
                    </ProfilePart>

                    <ProfilePart title='Primary Info'>
                        <Row>
                            <InfoBlock>
                                <InfoBlock.Title>Mobile: </InfoBlock.Title>
                                <InfoBlock.Property>{userData.mobile}</InfoBlock.Property>
                            </InfoBlock>
                            <InfoBlock>
                                <InfoBlock.Title>Email: </InfoBlock.Title>
                                <InfoBlock.Property>{userData.email}</InfoBlock.Property>
                            </InfoBlock>
                        </Row>
                    </ProfilePart>

                    {/* <ProfilePart title="Basic Info">
                        
                    </ProfilePart> */}
                </div>
            )}
            <TabFooter />
        </>
    )
}

export default ProfileContainer;