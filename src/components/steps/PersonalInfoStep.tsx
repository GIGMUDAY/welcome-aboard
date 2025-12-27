import { useFormContext } from "@/context/FormContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { countries, timezones } from "@/data/countries";
import { User, Mail, Phone, Globe, MapPin, Clock } from "lucide-react";
import { useState, useMemo } from "react";

export const PersonalInfoStep = () => {
  const { formData, updateFormData } = useFormContext();
  const [countrySearch, setCountrySearch] = useState("");
  const [timezoneSearch, setTimezoneSearch] = useState("");
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showTimezoneDropdown, setShowTimezoneDropdown] = useState(false);
  const [showPhoneCodeDropdown, setShowPhoneCodeDropdown] = useState(false);

  const filteredCountries = useMemo(() => {
    return countries.filter(c => 
      c.name.toLowerCase().includes(countrySearch.toLowerCase())
    );
  }, [countrySearch]);

  const filteredTimezones = useMemo(() => {
    return timezones.filter(tz => 
      tz.label.toLowerCase().includes(timezoneSearch.toLowerCase())
    );
  }, [timezoneSearch]);

  const selectedCountryData = countries.find(c => c.dialCode === formData.countryCode);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-display font-bold text-foreground mb-2">Personal Information</h2>
        <p className="text-muted-foreground">Let's start with your basic details</p>
      </div>

      {/* Full Name */}
      <div className="space-y-2">
        <Label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium">
          <User className="w-4 h-4 text-primary" />
          Full Name *
        </Label>
        <Input
          id="fullName"
          value={formData.fullName}
          onChange={(e) => updateFormData({ fullName: e.target.value })}
          placeholder="Enter your full name"
          className="h-12 bg-card border-border focus:border-primary focus:ring-primary/20"
        />
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
          <Mail className="w-4 h-4 text-primary" />
          Email Address *
        </Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          placeholder="you@example.com"
          className="h-12 bg-card border-border focus:border-primary focus:ring-primary/20"
        />
      </div>

      {/* Phone with Country Code */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Phone className="w-4 h-4 text-primary" />
          Phone / WhatsApp *
        </Label>
        <div className="flex gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowPhoneCodeDropdown(!showPhoneCodeDropdown)}
              className="h-12 px-3 flex items-center gap-2 bg-card border border-border rounded-lg hover:border-primary transition-colors min-w-[100px]"
            >
              <span className="text-lg">{selectedCountryData?.flag || "🌍"}</span>
              <span className="text-sm">{formData.countryCode}</span>
            </button>
            {showPhoneCodeDropdown && (
              <div className="absolute z-50 top-full left-0 mt-1 w-64 max-h-60 overflow-y-auto bg-popover border border-border rounded-lg shadow-lg">
                {countries.map(country => (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => {
                      updateFormData({ countryCode: country.dialCode });
                      setShowPhoneCodeDropdown(false);
                    }}
                    className="w-full px-3 py-2 text-left flex items-center gap-2 hover:bg-accent transition-colors"
                  >
                    <span>{country.flag}</span>
                    <span className="text-sm">{country.name}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{country.dialCode}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <Input
            value={formData.phoneNumber}
            onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
            placeholder="123 456 7890"
            className="h-12 flex-1 bg-card border-border focus:border-primary focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Country */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Globe className="w-4 h-4 text-primary" />
          Country of Residence *
        </Label>
        <div className="relative">
          <Input
            value={formData.country || countrySearch}
            onChange={(e) => {
              setCountrySearch(e.target.value);
              setShowCountryDropdown(true);
            }}
            onFocus={() => setShowCountryDropdown(true)}
            placeholder="Search for your country"
            className="h-12 bg-card border-border focus:border-primary focus:ring-primary/20"
          />
          {showCountryDropdown && filteredCountries.length > 0 && (
            <div className="absolute z-50 top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-popover border border-border rounded-lg shadow-lg">
              {filteredCountries.map(country => (
                <button
                  key={country.code}
                  type="button"
                  onClick={() => {
                    updateFormData({ country: country.name });
                    setCountrySearch(country.name);
                    setShowCountryDropdown(false);
                  }}
                  className="w-full px-4 py-3 text-left flex items-center gap-3 hover:bg-accent transition-colors"
                >
                  <span className="text-xl">{country.flag}</span>
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* City */}
      <div className="space-y-2">
        <Label htmlFor="city" className="flex items-center gap-2 text-sm font-medium">
          <MapPin className="w-4 h-4 text-primary" />
          City / Region *
        </Label>
        <Input
          id="city"
          value={formData.city}
          onChange={(e) => updateFormData({ city: e.target.value })}
          placeholder="Enter your city or region"
          className="h-12 bg-card border-border focus:border-primary focus:ring-primary/20"
        />
      </div>

      {/* Timezone */}
      <div className="space-y-2">
        <Label className="flex items-center gap-2 text-sm font-medium">
          <Clock className="w-4 h-4 text-primary" />
          Timezone *
        </Label>
        <div className="relative">
          <Input
            value={formData.timezone ? timezones.find(tz => tz.value === formData.timezone)?.label : timezoneSearch}
            onChange={(e) => {
              setTimezoneSearch(e.target.value);
              setShowTimezoneDropdown(true);
            }}
            onFocus={() => setShowTimezoneDropdown(true)}
            placeholder="Search for your timezone"
            className="h-12 bg-card border-border focus:border-primary focus:ring-primary/20"
          />
          {showTimezoneDropdown && filteredTimezones.length > 0 && (
            <div className="absolute z-50 top-full left-0 right-0 mt-1 max-h-60 overflow-y-auto bg-popover border border-border rounded-lg shadow-lg">
              {filteredTimezones.map(tz => (
                <button
                  key={tz.value}
                  type="button"
                  onClick={() => {
                    updateFormData({ timezone: tz.value });
                    setTimezoneSearch(tz.label);
                    setShowTimezoneDropdown(false);
                  }}
                  className="w-full px-4 py-3 text-left hover:bg-accent transition-colors"
                >
                  {tz.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
