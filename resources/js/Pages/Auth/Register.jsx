import { useEffect } from 'react';
import Input from "@/Components/TextInput";
import InputError from '@/Components/InputError';
import Label from "@/Components/InputLabel";
import Button from "@/Components/PrimaryButton";
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const handleOnChange = (event) => {
        setData(event.target.name, event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        // console.log(data);
        post(route('register'));
    };

    return (
        <>
            <Head title="Sign Up" />
            <div className="mx-auto max-w-screen min-h-screen bg-black text-white md:px-10 px-3">
            <div className="fixed top-[-50px] hidden lg:block">
                <img src="/images/signup-image.png"
                    className="hidden laptopLg:block laptopLg:max-w-[450px] laptopXl:max-w-[640px]" alt="" />
            </div>
            <div className="py-24 flex laptopLg:ml-[680px] laptopXl:ml-[870px]">
                <div>
                    <img src="/images/moonton-white.svg" alt="" />
                    <div className="my-[70px]">
                        <div className="font-semibold text-[26px] mb-3">
                            Sign Up
                        </div>
                        <p className="text-base text-[#767676] leading-7">
                            Explore our new movies and get <br />
                            the better insight for your life
                        </p>
                    </div>
                    <form  onSubmit={submit} className="w-[370px]">
                        <div className="flex flex-col gap-6">
                            <div>
                                <Label forInput="name">
                                    Full Name
                                </Label>
                                <Input
                                    name="name"
                                    id="name"
                                    value={data.name}
                                    placeholder="Full Name"
                                    isFocused={true}
                                    isError={errors.name ? true : false}
                                    onChange={handleOnChange}
                                    required
                                />
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div>
                                <Label forInput="email">
                                    Email Address
                                </Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={data.email}
                                    placeholder="Email Address"
                                    isError={errors.email ? true : false}
                                    onChange={handleOnChange}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>
                            <div>
                                <Label forInput="password">
                                    Password
                                </Label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={data.password}
                                    placeholder="password"
                                    isError={errors.password ? true : false}
                                    onChange={handleOnChange}
                                    required
                                />
                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div>
                                <Label forInput="confirmPassword">
                                    Confirm Password
                                </Label>
                                <Input
                                    type="password"
                                    name="password_confirmation"
                                    id="confirmPassword"
                                    value={data.password_confirmation}
                                    placeholder="Confirm Password"
                                    isError={errors.password_confirmation ? true : false}
                                    onChange={handleOnChange}
                                    required
                                />
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>
                        </div>
                        <div className="grid space-y-[14px] mt-[30px]">
                            <Button type="submit" disabled={processing}>
                                <span className="text-base font-semibold">
                                    Sign Up
                                </span>
                            </Button>
                            <Link href={route("login")}>
                                <Button type="button" variant="light-outline">
                                    <span className="text-base text-white">
                                        Sign In to My Account
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
