// app/[locale]/page.tsx
'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, LanguageSelector, Tabs, TabsContent, TabsList, TabsTrigger, ThemeSelector } from '@repo/ui';
import { useEffect } from 'react';
import { api } from '@repo/utility';

export default function HomePage() {
  const t = useTranslations('HomePage');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    api.get<{
      success:boolean;
      data:any[];
    }>('/api/testData',{next:{revalidate:10}}).then((res)=>{
      console.log(res,'vvvvvvvv');
    });

    

  },[])

  return (
    <div className="container mx-auto p-6 space-y-8">
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-amber-600">{t('title')}</h1>
        <div className="flex gap-2">
          <LanguageSelector />
          <ThemeSelector />
          <Button>Hello world</Button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>{t('features.internationalization.title')}</CardTitle>
            <CardDescription>{t('features.internationalization.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t('features.internationalization.details')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('features.theming.title')}</CardTitle>
            <CardDescription>{t('features.theming.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t('features.theming.details')}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t('features.components.title')}</CardTitle>
            <CardDescription>{t('features.components.description')}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t('features.components.details')}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="welcome" className="w-full">
        <TabsList>
          <TabsTrigger value="welcome">{t('tabs.welcome')}</TabsTrigger>
          <TabsTrigger value="features">{t('tabs.features')}</TabsTrigger>
          <TabsTrigger value="demo">{t('tabs.demo')}</TabsTrigger>
        </TabsList>
        <TabsContent value="welcome">
          <Card>
            <CardHeader>
              <CardTitle>{t('welcome.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{t('welcome.message')}</p>
              <Button className="mt-4">{t('welcome.action')}</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="features">
          <Card>
            <CardHeader>
              <CardTitle>{t('features.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>{t('features.list.internationalization')}</li>
                <li>{t('features.list.theming')}</li>
                <li>{t('features.list.components')}</li>
                <li>{t('features.list.performance')}</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="demo">
          <Card>
            <CardHeader>
              <CardTitle>{t('demo.title')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 flex-wrap">
                <Button variant="default">{t('demo.primary')}</Button>
                <Button variant="secondary">{t('demo.secondary')}</Button>
                <Button variant="outline">{t('demo.outline')}</Button>
                <Button variant="destructive">{t('demo.destructive')}</Button>
                <Button variant="ghost">{t('demo.ghost')}</Button>
                <Button variant="link">{t('demo.link')}</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}