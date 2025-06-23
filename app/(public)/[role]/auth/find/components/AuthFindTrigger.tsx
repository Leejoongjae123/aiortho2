import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/underline-tabs';
import AuthFindIdForm from './AuthFindIdForm';
import AuthFindIdResult from './AuthFindIdResult';
import { AuthFindIdFormValues, AuthFindPasswordFormValues, AuthFoundAccount } from '../types';
import AuthFindPasswordForm from './AuthFindPasswordForm';

interface AuthFindTriggerProps {
  foundAuth?: AuthFoundAccount;
  onSubmit?: (values: AuthFindIdFormValues | AuthFindPasswordFormValues) => void;
}

const AuthFindTrigger = ({ foundAuth, onSubmit }: AuthFindTriggerProps) => {
  const handleSubmitId = (data: AuthFindIdFormValues) => {
    onSubmit && onSubmit(data);
  };

  const handleSubmitPassword = (data: AuthFindPasswordFormValues) => {
    onSubmit && onSubmit(data);
  };

  return (
    <div className="w-full max-w-[540px] mx-auto">
      <div className="space-y-3">
        <h1 className="font-bold text-3xl text-[color:var(--aiortho-gray-900)]">계정정보 찾기</h1>
        <p className="font-normal text-base text-[color:var(--aiortho-gray-600)]">
          계정정보를 찾기 위해 아래 항목을 입력해주세요.
        </p>
      </div>

      <Tabs defaultValue="아이디 찾기" className="w-full mt-10">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger className="aiortho-tabs" value="아이디 찾기">
            아이디 찾기
          </TabsTrigger>
          <TabsTrigger className="aiortho-tabs" value="비밀번호 찾기">
            비밀번호 찾기
          </TabsTrigger>
        </TabsList>
        <TabsContent value="아이디 찾기">
          {foundAuth ? (
            <AuthFindIdResult name={foundAuth.name} email={foundAuth.email} />
          ) : (
            <AuthFindIdForm onSubmit={handleSubmitId} />
          )}
        </TabsContent>
        <TabsContent value="비밀번호 찾기">
          <AuthFindPasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthFindTrigger;
