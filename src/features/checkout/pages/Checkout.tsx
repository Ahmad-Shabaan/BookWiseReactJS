import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import FieldWrapper from "@/shared/components/common/Form/FieldWrapper";
import { Input } from "@/components/ui/input";
import { addressSchema, type AddressSchema } from "../utils";
import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { AddressForm } from "../types";
import { useGetDeliveryMethods } from "../hooks/useDeliveryMethods";
import ProgressPayment from "../components/ProgressPayment";
import PaymentSkeleton from "../components/PaymentSkeleton";
import { Lock, ArrowLeft } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Aside from "@/shared/components/common/Aside";
import AppError from "@/shared/components/common/ErrorBoundary/AppError";
import { useGetBasket } from "@/features/basket/hooks/useBasket";
import type { BasketResponse } from "@/features/basket/types";
import { BASKET_QUERY_KEYS } from "@/features/basket/constants/basket.constants";
import { updateBasketDeliveryMethod } from "@/features/basket/services/basket.api";
import { useAsideAnimation } from "@/shared/animations/aside.animation";
import { useCheckout } from "../hooks/useCheckout";
import useGetBasketId from "@/shared/hooks/useGetBasketId";

export default function Checkout() {
  const basketId = useGetBasketId();
  const checkoutIdempotencyKey = useRef(uuidv4()); //fixed across re-render
  const { handleCheckout } = useCheckout();
  const {
    data: basket,
    isLoading: cartLoading,
    isError: cartError,
  } = useGetBasket(basketId);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const [inLoadingUpdateDeliveryMethod, setInLoadingUpdateDeliveryMethod] =
    useState<boolean>(false);
  const { data: deliveryMethods, error: deliveryMethodError } =
    useGetDeliveryMethods();
  const sidebarRef = useRef<HTMLDivElement>(null);
  useAsideAnimation({ sectionRef: sidebarRef });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AddressSchema>({
    resolver: zodResolver(addressSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      country: "",
      city: "",
      state: "",
      street: "",
      postalCode: "",
      deliveryMethodId: "",
    },
  });

  useEffect(() => {
    if (basket) {
      setValue("deliveryMethodId", basket.deliveryMethodId?.toString() ?? "");
    }
  }, [setValue, basket]);
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true);
      toast.info("Please wait while we prepare the payment method...");
      const addressForm: AddressForm = {
        ...data,
        deliveryMethodId: Number(data.deliveryMethodId),
        basketId: basketId!,
      };
      const order = await handleCheckout({
        addressForm,
        checkoutIdempotencyKey: checkoutIdempotencyKey.current,
      });
      if (!order) throw new Error("Order has not created");
      const url =
        `https://accept.paymob.com/unifiedcheckout/` +
        `?publicKey=${order.publicKey}` +
        `&clientSecret=${order.clientSecret}`;
      window.location.href = url;
    } catch {
      toast.error(
        "Payment could not be completed. Please try again in a minute.",
      );
    } finally {
      setIsLoading(false);
    }
  });

  if (cartLoading) return <PaymentSkeleton />;

  if (cartError || !basket || basket?.items.length <= 0) {
    return (
      <AppError
        message="Oops! Something went wrong with Checkout. Please try again in a minute."
        link="Back to Cart"
        to="/library/basket"
      />
    );
  }

  const updateDeliveryMethod = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const deliveryMethodId = Number(e.target.value);
    const deliveryMethod = deliveryMethods?.find(
      (ele) => ele.id === deliveryMethodId,
    );
    if (deliveryMethod === undefined || basket === undefined) return;
    const updatedBasket: BasketResponse = {
      ...basket,
      deliveryMethodId,
      shippingPrice: deliveryMethod.cost,
    };
    try {
      setInLoadingUpdateDeliveryMethod(true);
      toast.info("Please wait while we update the delivery method...");
      await updateBasketDeliveryMethod(updatedBasket);
      await queryClient.invalidateQueries({
        queryKey: BASKET_QUERY_KEYS,
      });
    } catch {
      toast.error(
        "Oops! Something went wrong while updating the delivery method. Please try again in a minute.",
      );
    } finally {
      toast.success("Delivery method updated successfully.");
      setInLoadingUpdateDeliveryMethod(false);
    }
  };

  const itemCount =
    basket?.items?.reduce((sum, item) => sum + item.quantity, 0) ?? 0;
  const subtotal =
    basket?.items?.reduce((sum, item) => sum + item.price * item.quantity, 0) ??
    0;
  const shipping = basket?.shippingPrice ?? 0;
  const tax = subtotal * 0.0;
  const total = subtotal + shipping + tax;

  return (
    <main className="main-container">
      <div className="page-container">
        <ProgressPayment currentStep={1} />
        {/* <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div className="lg:col-span-2 space-y-6"> */}
        <div className="w-full  col-center lg:flex-row gap-6 lg:items-start">
          <div className="w-full  xl:max-w-xl flex-1 space-y-6">
            {/* <div className="flex flex-col lg:flex-row gap-8 xl:gap-16">
          <div className="w-full lg:w-2/3 space-y-8 sm:space-y-12"> */}
            <section className="bg-surface-container-low rounded-md px-4 py-8">
              <h2 className="aside-header">Shipping Information</h2>
              <form
                id="address-form"
                onSubmit={onSubmit}
                className="space-y-6"
                noValidate
              >
                {/* {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-error/20 bg-error/8 px-4 py-3 text-sm text-error"
                  >
                    <span className="mt-px text-base leading-none">⚠</span>
                    {error}
                  </div>
                )} */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FieldWrapper
                    id="checkout-firstName"
                    label="First Name"
                    errorId="firstName-error"
                    errorMessage={errors.firstName?.message}
                  >
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="checkout-firstName"
                          type="text"
                          placeholder="Jane"
                          autoComplete="given-name"
                          aria-invalid={!!errors.firstName}
                          aria-describedby={
                            errors.firstName ? "firstName-error" : undefined
                          }
                        />
                      )}
                    />
                  </FieldWrapper>

                  <FieldWrapper
                    id="checkout-lastName"
                    label="Last Name"
                    errorId="lastName-error"
                    errorMessage={errors.lastName?.message}
                  >
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="checkout-lastName"
                          type="text"
                          placeholder="Doe"
                          autoComplete="family-name"
                          aria-invalid={!!errors.lastName}
                          aria-describedby={
                            errors.lastName ? "lastName-error" : undefined
                          }
                        />
                      )}
                    />
                  </FieldWrapper>
                </div>

                <FieldWrapper
                  id="checkout-street"
                  label="Street Address"
                  errorId="street-error"
                  errorMessage={errors.street?.message}
                >
                  <Controller
                    name="street"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="checkout-street"
                        type="text"
                        placeholder="123 Nebula Way"
                        autoComplete="street-address"
                        aria-invalid={!!errors.street}
                        aria-describedby={
                          errors.street ? "street-error" : undefined
                        }
                      />
                    )}
                  />
                </FieldWrapper>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <FieldWrapper
                      id="checkout-city"
                      label="City"
                      errorId="city-error"
                      errorMessage={errors.city?.message}
                    >
                      <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="checkout-city"
                            type="text"
                            placeholder="Cosmos City"
                            autoComplete="address-level2"
                            aria-invalid={!!errors.city}
                            aria-describedby={
                              errors.city ? "city-error" : undefined
                            }
                          />
                        )}
                      />
                    </FieldWrapper>
                  </div>
                  <div>
                    <FieldWrapper
                      id="checkout-postalCode"
                      label="Postal Code"
                      errorId="postalCode-error"
                      errorMessage={errors.postalCode?.message}
                    >
                      <Controller
                        name="postalCode"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id="checkout-postalCode"
                            type="text"
                            placeholder="90210"
                            autoComplete="postal-code"
                            aria-invalid={!!errors.postalCode}
                            aria-describedby={
                              errors.postalCode ? "postalCode-error" : undefined
                            }
                          />
                        )}
                      />
                    </FieldWrapper>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FieldWrapper
                    id="checkout-country"
                    label="Country"
                    errorId="country-error"
                    errorMessage={errors.country?.message}
                  >
                    <Controller
                      name="country"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="checkout-country"
                          type="text"
                          placeholder="Egypt"
                          autoComplete="country-name"
                          aria-invalid={!!errors.country}
                          aria-describedby={
                            errors.country ? "country-error" : undefined
                          }
                        />
                      )}
                    />
                  </FieldWrapper>

                  <FieldWrapper
                    id="checkout-state"
                    label="State / Governorate"
                    errorId="state-error"
                    errorMessage={errors.state?.message}
                  >
                    <Controller
                      name="state"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="checkout-state"
                          type="text"
                          placeholder="Giza"
                          autoComplete="address-level1"
                          aria-invalid={!!errors.state}
                          aria-describedby={
                            errors.state ? "state-error" : undefined
                          }
                        />
                      )}
                    />
                  </FieldWrapper>
                </div>
              </form>
            </section>

            <section className="bg-surface-container-low rounded-md px-4 py-8">
              <h2 className="aside-header">Delivery Method</h2>
              <div className="space-y-3 sm:space-y-4">
                {deliveryMethodError ? (
                  <p className="text-error text-sm">
                    Failed to load delivery methods — please refresh the page.
                  </p>
                ) : (
                  deliveryMethods?.map((method) => (
                    <Controller
                      key={method.id}
                      name="deliveryMethodId"
                      control={control}
                      render={({ field }) => {
                        const isSelected = field.value === method.id.toString();
                        return (
                          <label
                            className={`flex items-center justify-between gap-3 p-4 sm:p-6 rounded-xl cursor-pointer transition-colors relative overflow-hidden ${
                              isSelected
                                ? "bg-surface-container-highest ring-1 ring-primary/50"
                                : "bg-surface-container hover:bg-surface-container-high border border-outline-variant/15"
                            }`}
                          >
                            {isSelected && (
                              <div className="absolute inset-0 bg-primary/5" />
                            )}
                            <div className="flex items-center gap-4 relative z-10">
                              <div
                                className={`size-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                  isSelected
                                    ? "border-primary"
                                    : "border-outline-variant"
                                }`}
                              >
                                {isSelected && (
                                  <div className="size-3 rounded-full bg-primary" />
                                )}
                              </div>
                              <div>
                                <div className="font-semibold text-on-surface">
                                  {method.shortName}
                                </div>
                                <div className="text-sm text-on-surface-variant mt-1">
                                  {method.description} — {method.deliveryTime}
                                </div>
                              </div>
                            </div>
                            <div
                              className={`font-semibold relative z-10 shrink-0 ${
                                method.cost === 0
                                  ? "text-primary"
                                  : "text-on-surface"
                              }`}
                            >
                              {method.cost === 0
                                ? "Free"
                                : `${method.cost} EGP`}
                            </div>
                            <input
                              type="radio"
                              value={method.id}
                              checked={isSelected}
                              onChange={(e) => {
                                updateDeliveryMethod(e);
                                field.onChange(method.id.toString());
                              }}
                              className="sr-only"
                              aria-invalid={!!errors.deliveryMethodId}
                              aria-describedby={
                                errors.deliveryMethodId
                                  ? "deliveryMethod-error"
                                  : undefined
                              }
                            />
                          </label>
                        );
                      }}
                    />
                  ))
                )}
                {errors.deliveryMethodId?.message && (
                  <p
                    id="deliveryMethod-error"
                    role="alert"
                    className="text-xs text-error pl-1"
                  >
                    {errors.deliveryMethodId.message}
                  </p>
                )}
              </div>
            </section>
          </div>

          <aside
            className="w-full lg:max-w-sm xl:max-w-md flex flex-col gap-6"
            // className="col-span-1 flex flex-col gap-6"
            ref={sidebarRef}
          >
            <Aside asideHeader="Order Summary">
              <>
                <div className="space-y-6 mb-8 pr-1">
                  {basket?.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 items-start not-last:bottom-border"
                    >
                      <div className="w-16 h-24 bg-surface-container-highest rounded overflow-hidden shrink-0 border border-outline-variant/15">
                        {item.pictureUrl ? (
                          <img
                            src={item.pictureUrl}
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                            <svg
                              className="size-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="grow min-w-0">
                        <h3 className="font-semibold text-on-surface mb-1 truncate">
                          {item.title}
                        </h3>
                        {/* <p className="text-sm text-on-surface-variant mb-2 truncate">
                        {item.author}
                      </p> */}
                        <p className="text-sm text-on-surface-variant mb-2 truncate">
                          QTY:{" "}
                          <span className="text-on-surface">
                            {item.quantity}
                          </span>
                        </p>
                        <div className="text-primary font-semibold">
                          {(item.price * item.quantity).toFixed(2)}{" "}
                          <span className="currency-span text-xs"> EGP</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 py-5 border-t border-surface-container-high">
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>
                      Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"}
                      )
                    </span>
                    <span className="text-on-surface font-medium">
                      {inLoadingUpdateDeliveryMethod
                        ? "000.00"
                        : subtotal.toFixed(2)}
                      <span className="currency-span text-xs"> EGP</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Shipping</span>
                    <span
                      className={
                        shipping > 0
                          ? "text-on-surface font-medium"
                          : "text-primary font-medium"
                      }
                    >
                      {shipping > 0
                        ? `${inLoadingUpdateDeliveryMethod ? "000.00" : shipping.toFixed(2)}EGP`
                        : "Free"}
                      {shipping > 0 && (
                        <span className="currency-span text-xs"> EGP</span>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Tax (Calculated)</span>
                    <span className="text-on-surface font-medium">
                      {tax.toFixed(2)}{" "}
                      <span className="currency-span text-xs"> EGP</span>
                    </span>
                  </div>
                </div>

                <div className="pt-5 mt-1 border-t border-surface-container-high">
                  <div className="flex justify-between items-end mb-6">
                    <span className="text-base font-semibold text-on-surface">
                      Total
                    </span>
                    <span className="total-price-span text-3xl ">
                      {inLoadingUpdateDeliveryMethod
                        ? "000.00"
                        : total.toFixed(2)}{" "}
                      <span className="currency-span">EGP</span>
                    </span>
                  </div>
                </div>
                <div className="w-full col-center">
                  <button
                    type="submit"
                    form="address-form"
                    disabled={isLoading}
                    className="btn-primary font-bold w-auto lg:w-full"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="size-4 rounded-full border-2 border-on-primary/30 border-t-on-primary animate-spin" />
                        Processing…
                      </span>
                    ) : (
                      <>
                        Continue to Payment
                        <svg
                          className="size-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                          />
                        </svg>
                      </>
                    )}
                  </button>
                  <Link
                    to="/library/basket"
                    className="btn-secondary mt-3 tracking-widest w-fit lg:w-full"
                  >
                    <ArrowLeft className="size-3.5" />
                    Return to Basket
                  </Link>
                  <div className="mt-6 flex items-center justify-center gap-2 text-xs text-on-surface-variant">
                    <Lock className="size-3.5" />
                    Secure SSL Checkout
                  </div>
                </div>

                {/* </div> */}
                {/* </div> */}
              </>
            </Aside>
          </aside>
        </div>
      </div>
    </main>
  );
}
