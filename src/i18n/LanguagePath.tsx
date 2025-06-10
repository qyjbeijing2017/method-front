import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useParams } from "react-router";

export function LanguagePath() {
    const params = useParams();
    const { i18n } = useTranslation();
    useEffect(() => {
        i18n.changeLanguage(params.language || 'en_us');
    }, [i18n, params.language]);
    return <Outlet />;
}