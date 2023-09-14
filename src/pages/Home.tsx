import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import Axios from '../lib/axios';
import { ADMIN_URL } from '@/lib/constants';

function Home() {
  const axios = new Axios();
  console.log(axios);
  const navigate = useNavigate();

  function openAdminInNewTab() {
    window.open(ADMIN_URL, '_blank', 'noreferrer');
  }

  function logout() {
    navigate('/login');
  }

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-r from-slate-100 to-slate-300">
      <div className="fixed w-full">
        <div className="grid grid-cols-6 gap-4 bg-gradient-to-r from-cyan-500 to-slate-800 p-4">
          <p className="col-start-3 col-span-2 text-center align-middle text-3xl text-slate-100">
            PCL Dashboard
          </p>
          <div className="col-end-7 col-span-2 justify-self-end">
            <Button
              variant="ghost"
              className="text-white border-solid"
              onClick={() => openAdminInNewTab()}
            >
              Admin
            </Button>
            <Button
              variant="ghost"
              className="text-white"
              onClick={() => logout()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div className="flex m-16 mt-32 justify-center space-x-16">
        <Card className="w-64 shadow-xl bg-gradient-to-r from-slate-400 to-cyan-100 border-solid">
          <CardHeader>
            <CardTitle>Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Create/Update balance of your customers</p>
          </CardContent>
          <CardFooter>
            <Button className="bg-zinc-800">Proceed</Button>
          </CardFooter>
        </Card>
        <Card className="w-64 shadow-xl bg-gradient-to-r from-slate-400 to-cyan-100 border-solid">
          <CardHeader>
            <CardTitle>Depot Operation</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Manage products in your Depot</p>
          </CardContent>
          <CardFooter>
            <Button className="bg-zinc-800" onClick={() => navigate('/depot')}>
              Proceed
            </Button>
          </CardFooter>
        </Card>
        <Card className="w-64 shadow-xl bg-gradient-to-r from-slate-400 to-cyan-100 border-solid">
          <CardHeader>
            <CardTitle>Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Sales, Return and Sales History</p>
          </CardContent>
          <CardFooter>
            <Button className="bg-zinc-800">Proceed</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="flex justify-center m-16 space-x-16">
        <Card className="w-64 shadow-xl bg-gradient-to-r from-slate-400 to-cyan-100 border-solid">
          <CardHeader>
            <CardTitle>Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <p>View your sales/balance reports</p>
          </CardContent>
          <CardFooter>
            <Button className="bg-zinc-800">Proceed</Button>
          </CardFooter>
        </Card>
        <Card className="w-64 shadow-xl bg-gradient-to-r from-slate-400 to-cyan-100 border-solid">
          <CardHeader>
            <CardTitle>Master Records</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Add/update products, customers and more</p>
          </CardContent>
          <CardFooter>
            <Button className="bg-zinc-800" onClick={() => openAdminInNewTab()}>
              Proceed
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Home;
