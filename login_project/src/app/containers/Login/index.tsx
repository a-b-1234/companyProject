import { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import { Form } from "app/components/Form"
import { TextField } from "app/components/TextField"
import { actions } from "../../store/slice"
import { translations } from "locales/i18n"
import { Api } from "api/api"
import { LoadingIndicator } from "app/components/LoadingIndicator"
import { Button } from "@mui/material"


interface Props {
    setIsLogin: (isLogin: boolean) => void
}

export const Login = ({ setIsLogin }: Props) => {
    const [emailAddress, setEmailAddress] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { t } = useTranslation();

    useEffect(() => {
        let token = sessionStorage.getItem('token');
        if (token !== null && token !== '') {
            handleLogedIn();
        }
    }, [])

    const isValidEmailAddress = useCallback(() => {
        return /\S+@\S+\.\S+/.test(emailAddress);
    }, [emailAddress])

    const isValidPassword = useCallback(() => {
        var regularExpression = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return regularExpression.test(password);
    }, [password])


    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogedIn(emailAddress, password);
    }

    const handleLogedIn = async (emailAddress?: string, password?: string) => {
        try {
            setIsLoading(true);
            const res = await Api.login({ "EmailAddress": emailAddress, "Password": password });
            if (res.status === 200) {
                setIsLogin(true);
                sessionStorage.setItem('token', res.data/*[0]*/.token);
                dispatch(actions.setPersonalDetails(res.data/*[0]*/.personalDetails));
                navigate('/');
            }
        } catch (err: any) {
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                <ElementWrapper>
                    <TextField
                        label={t(translations.userAccount.labels.userName)}
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        required
                        fullWidth
                    />
                    {emailAddress === '' || isValidEmailAddress() ? <></> : <label>email is invalid</label>}
                </ElementWrapper>
                <ElementWrapper>
                    <TextField
                        label={t(translations.userAccount.labels.password)}
                        type={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                    />
                    {password === '' || isValidPassword() ? <></> : <label>password is invalid, min 8 letter, with at least a symbol, upper and lower case letters and a number</label>}
                </ElementWrapper>
                <ElementWrapper>
                    <Button disabled={!isValidEmailAddress() || !isValidPassword()} type='submit' style={{ width: '100%' }} >
                        {!isLoading ? t(translations.userAccount.submitButtons.login) : <LoadingIndicator></LoadingIndicator>}
                    </Button>
                </ElementWrapper>
            </Form>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  text-align: center;
  margin: 150px auto;
  width: 20%;
`

const ElementWrapper = styled.div`
  margin: 20px;
  width: 100%;
`

const ErrorLabel = styled.div`
  color: red;
`