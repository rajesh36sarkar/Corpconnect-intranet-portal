import React from 'react';
import { Sparkles } from 'lucide-react';

// Full Logo for Sidebar
export const BrandLogo = ({ variant = "full", className = "" }) => {
  const [imageError, setImageError] = React.useState(false);

  // ICON ONLY
  if (variant === "icon") {
    return (
      <div className={`${className} flex items-center justify-center`}>
        {!imageError ? (
          <img
            src="/brand-logo.svg"
            alt="CorpConnect Logo"
            className="h-8 w-8 object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-highlight to-brand-accent flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-text-primary" />
          </div>
        )}
      </div>
    );
  }

  // MOBILE LOGO
  if (variant === "mobile") {
    return (
      <div className="flex items-center gap-2">
        {!imageError ? (
          <img
            src="/brand-logo.svg"
            alt="CorpConnect"
            className="h-8 w-8 object-contain shrink-0"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-highlight to-brand-accent flex items-center justify-center shrink-0">
            <Sparkles className="h-4 w-4 text-text-primary" />
          </div>
        )}

        <div className="min-w-0">
          {!imageError ? (
            <img
              src="/brand-name.svg"
              alt="CorpConnect"
              className="h-4 w-auto object-contain"
              onError={() => setImageError(true)}
            />
          ) : (
            <>
              <span className="font-black text-text-primary tracking-tight text-sm block">
                CorpConnect
              </span>
              <p className="text-[8px] text-text-muted">
                Enterprise Portal
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  // DEFAULT SIDEBAR LOGO
  return (
    <div className="flex items-center gap-2.5">
      {!imageError ? (
        <div className="p-2 bg-gradient-to-br from-brand-highlight to-brand-accent rounded-xl shadow-sm shrink-0">
          <img
            src="/brand-logo.svg"
            alt="CorpConnect Logo"
            className="h-5 w-5 object-contain"
            onError={() => setImageError(true)}
          />
        </div>
      ) : (
        <div className="p-2 bg-gradient-to-br from-brand-highlight to-brand-accent rounded-xl shadow-sm shrink-0">
          <Sparkles className="h-5 w-5 text-text-primary" />
        </div>
      )}

      <div className="min-w-0">
        {!imageError ? (
          <img
            src="/brand-name.svg"
            alt="CorpConnect"
            className="h-5 w-auto object-contain"
            onError={() => setImageError(true)}
          />
        ) : (
          <>
            <h1 className="text-lg font-black text-text-primary tracking-tight">
              CorpConnect
            </h1>
            <p className="text-[10px] font-semibold text-text-muted">
              Enterprise Portal
            </p>
          </>
        )}
      </div>
    </div>
  );
};

// LOGIN PAGE LOGO
export const LoginLogo = () => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      {!imageError ? (
        <img
          src="/brand-logo.svg"
          alt="CorpConnect Logo"
          className="h-16 w-16 object-contain"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-highlight to-brand-accent flex items-center justify-center shadow-lg">
          <Sparkles className="h-8 w-8 text-text-primary" />
        </div>
      )}

      {!imageError ? (
        <img
          src="/brand-name.svg"
          alt="CorpConnect"
          className="h-8 w-auto object-contain"
          onError={() => setImageError(true)}
        />
      ) : (
        <>
          <h1 className="text-2xl font-black text-text-primary tracking-tight">
            CorpConnect
          </h1>
          <p className="text-[10px] text-text-muted">
            Enterprise Portal
          </p>
        </>
      )}
    </div>
  );
};

// TEXT ONLY FALLBACK
export const TextLogo = () => {
  return (
    <div className="flex items-center gap-2.5">
      <div className="p-2 bg-gradient-to-br from-brand-highlight to-brand-accent rounded-xl shadow-sm">
        <Sparkles className="h-5 w-5 text-text-primary" />
      </div>

      <div>
        <h1 className="text-lg font-black text-text-primary tracking-tight">
          CorpConnect
        </h1>

        <p className="text-[10px] font-semibold text-text-muted">
          Enterprise Portal
        </p>
      </div>
    </div>
  );
};

export default BrandLogo;